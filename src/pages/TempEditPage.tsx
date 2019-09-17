import * as React from "react";
import axios from "axios";
import DatasetForm from "../components/Form";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import DatasetMock from "../mock/datasetMock";
import PolicyMock from "../mock/policyMock";
import { any } from "prop-types";
import { async } from "q";

const server_backend = process.env.REACT_APP_BACKEND_ENDPOINT;
const server_policy = process.env.REACT_APP_POLICY_ENDPOINT;

const reduceList = (list: any) => {
    if (!list) return;
    return list.reduce((acc: any, curr: any) => {
        return [...acc, !curr ? null : curr.code];
    }, []);
};

const reducePolicies = (list: any) => {
    if (!list) return;

    return list.reduce((acc: any, curr: any) => {
        return [
            ...acc,
            {
                datasetTitle: curr.dataset.title,
                id: curr.policyId,
                purposeCode: curr.purpose.code,
                legalBasisDescription: curr.legalBasisDescription
            }
        ];
    }, []);
};

const initializeFormValues = (data: any, policies: any) => {
    console.log(policies, "datttaa");
    if (!data) return null;

    return {
        title: data.title,
        contentType: data.contentType,
        pi: data.pi,
        categories: reduceList(data.categories),
        provenances: reduceList(data.provenances),
        keywords: data.keywords,
        description: data.description,
        policies: reducePolicies(policies)
    };
};

const EditPage = (props: any) => {
    const [dataset, setDataset] = React.useState();
    const [policies, setPolicies] = React.useState();
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);

    const handleAxiosError = (error: any) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(error.message);
            setError(error.message);
        }
    };

    const handleGetDatasetResponse = (response: any) => {
        if (typeof response.data === "object" && response.data !== null) {
            setDataset(response.data);
        } else {
            setError(response.data);
        }
    };

    const handleGetPolicyResponse = (response: any) => {
        if (typeof response.data === "object" && response.data !== null) {
            setPolicies(response.data.content);
        } else {
            setError(response.data);
        }
    };

    const handlePostPolicyResponse = (response: any) => {
        if (!response) return null;
        console.log(response, "RESPONSE");

        if (Array.isArray(response.data) && response.data !== null) {
            setPolicies([...policies, ...response.data]);
        }
    };

    const getAllCreatedPolicies = (values: any[]) => {
        return values.filter((value: any) => {
            if (!value.id) return value;
        }, []);
    };

    const handleSubmit = async (values: any) => {
        console.log("submitted", values);
        if (!values) return null;
        const createPolicyBody = getAllCreatedPolicies(values.policies);
        if (createPolicyBody.length > 0) {
            await axios
                .post(`${server_policy}`, createPolicyBody)
                .then(handlePostPolicyResponse);
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios
                .get(`${server_backend}/${props.match.params.id}`)
                .then(handleGetDatasetResponse)
                .catch(handleAxiosError);

            await axios
                .get(
                    `${server_policy}?datasetId=${props.match.params.id}&pageSize=100`
                )
                .then(handleGetPolicyResponse)
                .catch(handleAxiosError);

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <h1>Rediger</h1>
            {isLoading ? (
                <Spinner size={30} />
            ) : (
                <DatasetForm
                    formInitialValues={initializeFormValues(dataset, policies)}
                    isEdit={true}
                    submit={handleSubmit}
                />
            )}
        </React.Fragment>
    );
};

export default EditPage;
