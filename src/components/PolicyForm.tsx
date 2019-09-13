import * as React from "react";
import { Formik, FormikActions, FormikProps, Form } from "formik";

import { BlockProps, Block } from "baseui/block";

type FormProps = {
    formInitialValues: PolicyFormValues;
    submit: Function;
    isEdit?: boolean;
};

interface PolicyFormValues {
    text: string;
}

let formInitialValues = {
    text: ""
};

const itemProps: BlockProps = {
    overrides: {
        Block: {
            style: ({ $theme }) => ({
                width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
                marginBottom: "2rem"
            })
        }
    }
};

const PolicyForm = () => {
    return (
        <Formik
            initialValues={formInitialValues}
            onSubmit={(
                values: PolicyFormValues,
                actions: FormikActions<PolicyFormValues>
            ) => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
            }}
            render={(formikBag: FormikProps<PolicyFormValues>) => (
                <Form>
                    <button>Knapp</button>
                </Form>
            )}
        />
    );
};

export default PolicyForm;
