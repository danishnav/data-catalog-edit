import * as React from "react";
import { Block } from "baseui/block";
import axios from "axios";
import { Card } from "baseui/card";
import { Paragraph2 } from "baseui/typography";
import DatasetForm from "../components/Form";

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

function renderSuccessMessage(message: any | object) {
    return (
        <Block marginBottom="2rem">
            <Card>
                <Paragraph2>{message}</Paragraph2>
            </Card>
        </Block>
    );
}

const CreatePage = (props: any) => {
    const [isCreated, setCreated] = React.useState<boolean>(false);

    const handleSubmit = (values: object) => {
        let body = [values];
        //axios.post(`${server}`, body).then(res => console.log(res));
        console.log("submitted", body);
        setCreated(true);
    };

    return (
        <React.Fragment>
            <Block>
                <h1>Datasett</h1>
                {isCreated
                    ? renderSuccessMessage("Datasettet er nå opprettet.")
                    : null}

                <DatasetForm
                    formInitialValues={initialFormValues}
                    submit={handleSubmit}
                />
            </Block>
        </React.Fragment>
    );
};

export default CreatePage;
