import * as React from "react";
import axios from "axios";
import DatasetForm from "../components/Form";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";

const server = process.env.REACT_APP_BACKEND_ENDPOINT;

let initialFormValues = {
    title: "",
    contentType: "",
    pi: "",
    spatial: "",
    publisher: "",
    description: "",
    categories: [],
    provenances: [],
    keywords: []
};

const EditPage = (props: any) => {
    const [data, setData] = React.useState(initialFormValues);
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

    React.useEffect(() => {
        axios
            .get(`${server}/${props.match.params.id}`)
            .then(handleGetIndexResponse)
            .catch(handleAxiosError);
    }, []);

    return (
        <React.Fragment>
            <h1>Rediger</h1>
            {isLoading ? (
                <Spinner size={30} />
            ) : (
                <DatasetForm
                    formInitialValues={data}
                    submit={handleSubmit}
                    isEdit={true}
                />
            )}
        </React.Fragment>
    );
};

export default EditPage;
