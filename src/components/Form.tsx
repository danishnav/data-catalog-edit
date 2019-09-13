import * as React from "react";
import {
    Formik,
    FormikActions,
    FormikProps,
    Form,
    Field,
    FieldProps,
    FieldArray,
    FieldArrayRenderProps
} from "formik";
import { FormControl } from "baseui/form-control";
import { Input, SIZE } from "baseui/input";
import { BlockProps, Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE, KIND as ButtonKind } from "baseui/button";
import { Plus } from "baseui/icon";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { Select, TYPE, Value } from "baseui/select";
import { Label1 } from "baseui/typography";

import Codelist from "../mockCodelist";

type FormProps = {
    formInitialValues: MyFormValues;
    submit: Function;
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
    overrides: {
        Block: {
            style: ({ $theme }) => ({
                width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
                marginBottom: '2rem'
            })
        }
    }
};

const rowBlockProps: BlockProps = {
    display: 'flex',
}

const tagListProps: BlockProps = {
    alignSelf: "flex-end",
    width: 'auto',
    marginLeft: '2rem'
}

function renderTagList(list: any[], arrayHelpers: FieldArrayRenderProps) {
    return (
        <React.Fragment>
            {list && list.length > 0
                ? list.map((item, index) => (
                    <Tag
                        key={item}
                        variant={VARIANT.outlined}
                        kind={KIND.positive}
                        onActionClick={() => arrayHelpers.remove(index)}
                    >
                        {item}
                    </Tag>
                ))
                : (null)
            }
        </React.Fragment>
    )
}

const DatasetForm = ({ formInitialValues, submit }: FormProps) => {
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
                submit(values)
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
                                    <Block {...rowBlockProps}>
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
                                        <Block {...tagListProps}>
                                            {renderTagList(formikBag.values.categories, arrayHelpers)}
                                        </Block>
                                    </Block>
                                )}
                            />
                        </FlexGridItem>
                        <FlexGrid display="none"></FlexGrid>
                        <FlexGrid display="none"></FlexGrid>

                        <FlexGridItem {...itemProps}>
                            <FieldArray
                                name="provenances"
                                render={arrayHelpers => (
                                    <Block {...rowBlockProps}>
                                        <Block width="50%">
                                            <Label1 marginBottom="8px">Provenances</Label1>
                                            <Input
                                                type="text"
                                                placeholder="Legg til provenance"
                                                value={currentProvenanceValue}
                                                onChange={event => setCurrentProvenanceValue(event.currentTarget.value)}
                                                size="compact"
                                                overrides={{
                                                    After: () => (
                                                        <Button
                                                            type="button"
                                                            shape={SHAPE.square}
                                                            kind={ButtonKind.primary}
                                                            size="compact"
                                                            onClick={() => arrayHelpers.push(currentProvenanceValue)}
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    )
                                                }}
                                            />
                                        </Block>
                                        <Block {...tagListProps}>
                                            {renderTagList(formikBag.values.provenances, arrayHelpers)}
                                        </Block>
                                    </Block>
                                )}
                            />
                        </FlexGridItem>
                        <FlexGrid display="none"></FlexGrid>
                        <FlexGrid display="none"></FlexGrid>

                        <FlexGridItem {...itemProps}>
                            <FieldArray
                                name="keywords"
                                render={arrayHelpers => (
                                    <Block {...rowBlockProps}>
                                        <Block width="50%">
                                            <Label1 marginBottom="8px">Keywords</Label1>
                                            <Input
                                                type="text"
                                                placeholder="Legg til nøkkelord"
                                                value={currentKeywordValue}
                                                onChange={event => setCurrentKeywordValue(event.currentTarget.value)}
                                                size="compact"
                                                overrides={{
                                                    After: () => (
                                                        <Button
                                                            type="button"
                                                            shape={SHAPE.square}
                                                            kind={ButtonKind.primary}
                                                            size="compact"
                                                            onClick={() => arrayHelpers.push(currentKeywordValue)}
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    )
                                                }}
                                            />
                                        </Block>
                                        <Block {...tagListProps}>
                                            {renderTagList(formikBag.values.keywords, arrayHelpers)}
                                        </Block>
                                    </Block>
                                )}
                            />
                        </FlexGridItem>


                        <FlexGridItem marginTop="1rem">
                            <Field
                                name="description"
                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                    <FormControl label="Description">
                                        <Textarea
                                            {...field}
                                            size={SIZE.compact}
                                        />
                                    </FormControl>
                                )}
                            />
                        </FlexGridItem>

                    </FlexGrid>
                    
                    <Block paddingTop="1rem"><hr/></Block>

                    <Block marginTop="2rem" width="100%">
                        <Button
                            type="submit"
                            kind={ButtonKind.secondary}
                            overrides={{
                                BaseButton: {
                                    style: ({ $theme }) => {
                                        return {
                                            alignContent: 'center',
                                            paddingRight: '3rem',
                                            paddingLeft: '3rem'
                                        };
                                    }
                                }
                            }}
                        >
                            Lagre
                        </Button>
                    </Block>
                </Form>
            )}
        />
    );
}

export default DatasetForm;
