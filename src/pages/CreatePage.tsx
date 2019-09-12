import * as React from "react";

import { Block } from "baseui/block";
import DatasetForm from "../components/Form";
import axios from "axios";

const server = process.env.REACT_APP_BACKEND_ENDPOINT;

let initialFormValues = {
    title: "",
    contentType: "",
    spatial: "",
    publisher: "",
    description: "",
    categories: [],
    provenances: [],
    keywords: []
};

const CreatePage = (props: any) => {
    // const handleSubmit = () => {
    //     axios.post(`${server}`, body).then(res => console.log(res));
    // };

    return (
        <React.Fragment>
            <Block>
                <Block alignItems="center" width="100%">
                    <h1>Opprett nytt Datasett</h1>
                </Block>
                <DatasetForm formInitialValues={initialFormValues} />
            </Block>
        </React.Fragment>
    );
};

export default CreatePage;
