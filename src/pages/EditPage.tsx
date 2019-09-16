import * as React from "react";
import axios from "axios";
import DatasetForm from "../components/Form";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import MockDataset from './mockDataset'

const server = process.env.REACT_APP_BACKEND_ENDPOINT;

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
    if(!list) return
    return list.reduce((acc: any, curr: any) => {
        return [...acc, !curr ? null : curr.code]
    }, [])
}


const reducePolicies = (list: any) => {
    if(!list) return
    console.log(list, 'pars')
    let parsed = list.reduce((acc: any, curr: any) => {
        return [...acc, {
            purposeCode: curr.purpose.code,
            legalBasisDescription: curr.legalBasisDescription
        }]
    }, [])
    console.log(parsed, "PARSED")
    return parsed
}

const parseValuesForForm = (data: any) => {
    if (!data) return null

    return {
        title: data.title,
        contentType: data.contentType,
        pi: data.pi,
        categories: reduceList(data.categories),
        provenances: reduceList(data.provenances),
        keywords: data.keywords,
        description: data.description,
        policies: reducePolicies(data.policies)
    }
}

let initialFormValues = parseValuesForForm(MockDataset)


const EditPage = (props: any) => {
    const [data, setData] = React.useState(parseValuesForForm(MockDataset));
    const [error, setError] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);

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
            setData(response.data);
            setLoading(false);
        } else {
            setError(response.data);
        }
    };

    const handleSubmit = () => {
        console.log("submitted");
    };

    // React.useEffect(() => {
    //     axios
    //         .get(`${server}/${props.match.params.id}`)
    //         .then(handleGetIndexResponse)
    //         .catch(handleAxiosError);
    // }, []);

    return (
        <React.Fragment>
            <h1>Rediger</h1>
            {isLoading ? (
                <Spinner size={30} />
            ) : (
                <DatasetForm formInitialValues={initialFormValues} isEdit={true} submit={handleSubmit}/>
            )}
        </React.Fragment>
    );
};

export default EditPage;
