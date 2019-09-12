import * as React from "react";
import {
    Formik,
    FormikActions,
    FormikProps,
    Form,
    Field,
    FieldProps,
    FieldArray
} from "formik";
import { FormControl } from "baseui/form-control";
import { Input, SIZE } from "baseui/input";
import { BlockProps, Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { LightTheme, useStyletron } from "baseui";
import { StatefulMenu } from "baseui/menu";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from "baseui/button";
import { Plus } from "baseui/icon";
import { Upload } from "baseui/icon";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { Select, TYPE, Value } from "baseui/select";
import { Label1 } from "baseui/typography";

import Codelist from "../mockCodelist";

type FormProps = {
    formInitialValues: MyFormValues;
};

interface MyFormValues {
    title: string;
    contentType: string;
    spatial: string;
    publisher: string;
    description: string;
    categories: Array<string>;
    provenances: Array<string>;
    keywords: Array<string>;
}

const row = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3rem",
    backgroundColor: "mono300"
};

function DatasetForm({ formInitialValues }: FormProps) {
    const [useCss] = useStyletron();
    console.log(formInitialValues);
    return (
        <div>
            <Formik
                initialValues={formInitialValues}
                onSubmit={(
                    values: MyFormValues,
                    actions: FormikActions<MyFormValues>
                ) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
                render={(formikBag: FormikProps<MyFormValues>) => (
                    <Form>
                        <div
                            className={useCss({
                                background: "mono300",
                                width: "100%"
                            })}
                        >
                            TEXT
                        </div>

                        <Block>
                            <Block overrides={{ Block: { style: row } }}>
                                <Block backgroundColor="primary200">div</Block>
                                <Block backgroundColor="primary200">div</Block>
                                <Block backgroundColor="primary200">div</Block>
                            </Block>

                            <Block marginTop="50px">
                                <button
                                    type="submit"
                                    disabled={formikBag.isSubmitting}
                                >
                                    Submit
                                </button>
                            </Block>
                        </Block>
                    </Form>
                )}
            />
        </div>
    );
}

export default DatasetForm;
