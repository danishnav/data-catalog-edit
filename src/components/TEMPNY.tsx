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
    pi: string;
    spatial: string;
    publisher: string;
    description: string;
    categories: Array<string>;
    provenances: Array<string>;
    keywords: Array<string>;
}

const itemProps: BlockProps = {
    display: 'flex',
    flexDirection: 'column',
};

const DatasetForm = ({ formInitialValues }: FormProps) => {
    const [value, setValue] = React.useState<Value>([]);
    const [currentKeywordValue, setCurrentKeywordValue] = React.useState('');
    const [currentProvenanceValue, setCurrentProvenanceValue] = React.useState('');

    const getParsedOptions = (codelist: object | undefined, provenances: any | undefined) => {
        if (!codelist)
            return []

        let parsedOptions = Object.keys(codelist).reduce((acc: any, curr: any) => {
            return [...acc, { id: curr }]
        }, [])

        return parsedOptions.filter(option => provenances.includes(option.id) ? null : option.id)
    }

    return (
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
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale1200"
                        flexGridRowGap="scale800"
                    >
                        <FlexGridItem>
                            <Field
                                name="title"
                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                    <FormControl label="Title">
                                        <Input {...field} size="compact" />
                                    </FormControl>
                                )}
                            />
                        </FlexGridItem>

                        <FlexGridItem>
                            <Field
                                name="contentType"
                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                    <FormControl label="Type">
                                        <Input {...field} size="compact" />
                                    </FormControl>
                                )}
                            />
                        </FlexGridItem>



                        <FlexGridItem>
                            <Field
                                name="pi"
                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                    <FormControl label="PI">
                                        <Input {...field} size="compact" />
                                    </FormControl>
                                )}
                            />
                        </FlexGridItem>


                        <FlexGridItem {...itemProps}>
                                <FieldArray
                                    name="categories"
                                    render={arrayHelpers => (
                                        <Block display="flex">
                                            <Block width="50%">
                                            <Label1 marginBottom="8px">Categories</Label1>

                                            <Select
                                                options={getParsedOptions(Codelist.CATEGORY, formikBag.values.categories)}
                                                type={TYPE.search}
                                                labelKey="id"
                                                valueKey="id"
                                                onChange={({ option }) => {
                                                    arrayHelpers.push(option ? option.id : null)
                                                }}
                                                value={value}
                                                size="compact"
                                            />
                                            </Block>
                                            <Block paddingRight="3rem"></Block>
                                            
                                            <Block alignSelf="flex-end">
                                            {formikBag.values.categories && formikBag.values.categories.length > 0
                                                ? formikBag.values.categories.map((category, index) => (
                                                    <Tag
                                                        key={category}
                                                        variant={VARIANT.outlined}
                                                        kind={KIND.positive}
                                                        onActionClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {category}
                                                    </Tag>
                                                ))
                                                : null
                                            }
                                            </Block>      
                                            
                                        </Block>
                                    )}
                                />
                            </FlexGridItem>

                        <FlexGridItem display="none"></FlexGridItem>
                        <FlexGridItem display="none"></FlexGridItem>

                            

                        <FlexGridItem>
                            <Field
                                name="description"
                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                    <FormControl label="Description">
                                        <Textarea
                                            {...field}
                                            size={SIZE.default}
                                        />
                                    </FormControl>
                                )}
                            />
                        </FlexGridItem>
                    </FlexGrid>


                    <Block marginTop="50px">
                        <button
                            type="submit"
                            disabled={formikBag.isSubmitting}
                        >
                            Submit
                        </button>
                    </Block>
                </Form>
            )}
        />
    );
}

export default DatasetForm;
