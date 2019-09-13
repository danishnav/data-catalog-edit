import * as React from "react";

import { Block } from "baseui/block";
import DatasetForm from "../components/Form";
import axios from "axios";

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

const CreatePage = (props: any) => {
    const handleSubmit = (values: object) => {
        let body = [values];
        axios.post(`${server}`, body).then(res => console.log(res));
        console.log("submitted", body);
    };

    return (
        <React.Fragment>
            <Block>
                <Block alignItems="center" width="100%">
                    <h1>Opprett nytt Datasett</h1>
                </Block>
                <DatasetForm
                    formInitialValues={initialFormValues}
                    submit={handleSubmit}
                />
            </Block>
        </React.Fragment>
    );
};

export default CreatePage;
