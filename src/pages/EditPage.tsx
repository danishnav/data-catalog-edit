import * as React from "react";
import axios from "axios";
import DatasetForm from "../components/Form";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import MockDataset from "./mockDataset";
import { any } from "prop-types";
import { async } from "q";

import PolicyTable from "../components/PolicyTable";

const server_backend = process.env.REACT_APP_BACKEND_ENDPOINT;
const server_policy = process.env.REACT_APP_POLICY_ENDPOINT;

// let initialFormValues = {
//     title: "",
//     contentType: "",
//     pi: "",
//     spatial: "",
//     publisher: "",
//     description: "",
//     categories: [],
//     provenances: [],
//     keywords: []
// };

const reduceList = (list: any) => {
    if (!list) return;
    return list.reduce((acc: any, curr: any) => {
        return [...acc, !curr ? null : curr.code];
    }, []);
};

const initialPolicyValues = (list: any) => {
    if (!list) return;
    console.log(list, "list");
    let parsed = list.reduce((acc: any, curr: any) => {
        return [
            ...acc,
            {
                datasetTitle: curr.dataset.title,
                id: curr.policyId,
                legalBasisDescription: curr.legalBasisDescription,
                purposeCode: curr.purpose.code
            }
        ];
    }, []);

    console.log("paarsed", parsed);

    return parsed;
};

const initialDatasetValues = (data: any) => {
    if (!data) return null;

    return {
        title: data.title,
        contentType: data.contentType,
        pi: data.pi,
        categories: reduceList(data.categories),
        provenances: reduceList(data.provenances),
        keywords: data.keywords,
        description: data.description
    };
};

const policiesWithDatasetTitle = (policies: any, title: any) => {
    return policies.map((policy: any) => {
        return { ...policy, datasetTitle: title };
    });
};

const EditPage = (props: any) => {
    const [data, setData] = React.useState();
    const [policies, setPolicies] = React.useState();
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const [isCreated, setCreated] = React.useState<boolean>(false);

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

    const handleGetIndexResponse = (response: any) => {
        console.log(response, "response");

        if (typeof response.data === "object" && response.data !== null) {
            setData(initialDatasetValues(response.data));
            setLoading(false);
        } else {
            setError(response.data);
        }
    };

    const handleGetPolicyResponse = (response: any) => {
        console.log(response, "response");

        if (typeof response.data === "object" && response.data !== null) {
            setPolicies(initialPolicyValues(response.data.content));
            setLoading(false);
        } else {
            setError(response.data);
        }
    };

    const handleSubmit = (values: any) => {
        let datasetBody = [values];
        let policyBody = policiesWithDatasetTitle(
            values.policies,
            values.title
        );
        console.log("submitted policy", policyBody);
        //axios.post(`${policyServer}`, policyBody).then(res => console.log(res));
        console.log("submitted Body", datasetBody);
        setCreated(true);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios
                .get(`${server_backend}/${props.match.params.id}`)
                .then(handleGetIndexResponse)
                .catch(handleAxiosError);

            await axios
                .get(`${server_policy}?datasetId=${props.match.params.id}`)
                .then(handleGetPolicyResponse)
                .catch(handleAxiosError);

            console.log(policies);

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
                <React.Fragment>
                    <DatasetForm
                        formInitialValues={data}
                        submit={handleSubmit}
                    />
                    <Block marginTop="50px">
                        <PolicyTable
                            policies={policies}
                            onRemovePolicy={() => console.log("removed")}
                            onAdd={() => console.log("Added")}
                        />
                    </Block>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default EditPage;
