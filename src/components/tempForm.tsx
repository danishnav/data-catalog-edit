import * as React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps, FieldArray } from 'formik';
import { FormControl } from 'baseui/form-control';
import { Input, SIZE } from 'baseui/input';
import { BlockProps, Block } from 'baseui/block';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { LightTheme } from 'baseui';
import { StatefulMenu } from 'baseui/menu';
import { Textarea } from 'baseui/textarea';
import { Button, SHAPE } from 'baseui/button';
import { Plus } from 'baseui/icon';
import { Upload } from 'baseui/icon';
import { Tag, KIND, VARIANT } from 'baseui/tag';
import { Select, TYPE, Value } from 'baseui/select';
import { Label1 } from 'baseui/typography';

import Codelist from '../mockCodelist'

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

let initialFormValues = {
    title: '',
    contentType: '',
    spatial: '',
    publisher: '',
    description: '',
    categories: [],
    provenances: [],
    keywords: []
}

// Alt under her mulig flytte til ny fil
const row: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem'
};

const itemProps: BlockProps = {
    display: 'flex',
    flexDirection: 'column',
};



const DatasetForm: React.FC<{}> = () => {
    const [value, setValue] = React.useState<Value>([]);
    const [currentKeywordValue, setCurrentKeywordValue] = React.useState('');
    const [currentProvenanceValue, setCurrentProvenanceValue] = React.useState('');


    // Parsing values from codelist to options for Select and filters out the ones that are selected from the menu
    const getParsedOptions = (codelist: object | undefined, provenances: any | undefined) => {
        if (!codelist)
            return []

        let parsedOptions = Object.keys(codelist).reduce((acc: any, curr: any) => {
            return [...acc, { id: curr }]
        }, [])

        return parsedOptions.filter(option => provenances.includes(option.id) ? null : option.id)
    }

    return (
        <div>
            <Formik
                initialValues={initialFormValues}
                onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false)
                }}
                render={(formikBag: FormikProps<MyFormValues>) => (
                    <Form>
                        <FlexGrid
                            flexGridColumnCount={3}
                            flexGridColumnGap="scale1200"
                            flexGridRowGap="scale1000"
                        >
                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="title"
                                    render={({ field, form }: FieldProps<MyFormValues>) => (
                                        <FormControl label="Title">
                                            <Input {...field} size="compact" />
                                        </FormControl>
                                    )}
                                />
                            </FlexGridItem>
                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="contentType"
                                    render={({ field, form }: FieldProps<MyFormValues>) => (
                                        <FormControl label="Type">
                                            <Input {...field} size="compact" />
                                        </FormControl>
                                    )}
                                />
                            </FlexGridItem>
                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="spatial"
                                    render={({ field, form }: FieldProps<MyFormValues>) => (
                                        <FormControl label="Spatial">
                                            <Input {...field} size="compact" />
                                        </FormControl>
                                    )}
                                />
                            </FlexGridItem>
                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="publisher"
                                    render={({ field, form }: FieldProps<MyFormValues>) => (
                                        <FormControl label="Publisher">
                                            <Input {...field} size="compact" />
                                        </FormControl>
                                    )}
                                />
                            </FlexGridItem>

                            <FlexGridItem {...itemProps}>
                                <FieldArray
                                    name="categories"
                                    render={arrayHelpers => (
                                        <Block>
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
                                    )}
                                />
                            </FlexGridItem>

                            <FlexGridItem {...itemProps}>
                                <FieldArray
                                    name="keywords"
                                    render={arrayHelpers => (
                                        <Block>
                                            <Label1 marginBottom="8px">Keywords</Label1>
                                            <Block display="flex" justifyContent="space-between">
                                                <Input
                                                    type="text"
                                                    placeholder="Legg til nøkkelord"
                                                    value={currentKeywordValue}
                                                    onChange={event => setCurrentKeywordValue(event.currentTarget.value)}
                                                    size="compact"
                                                />
                                                <Button
                                                    type="button"
                                                    shape={SHAPE.square}
                                                    size="compact"
                                                    onClick={() => arrayHelpers.push(currentKeywordValue)}
                                                >+</Button>
                                            </Block>


                                            {formikBag.values.keywords && formikBag.values.keywords.length > 0
                                                ? formikBag.values.keywords.map((keyword, index) => (
                                                    <Tag
                                                        key={keyword}
                                                        kind={KIND.primary}
                                                        onActionClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {keyword}
                                                    </Tag>
                                                ))
                                                : null
                                            }
                                        </Block>
                                    )}
                                />
                            </FlexGridItem>

                            <FlexGridItem {...itemProps}>
                                <FieldArray
                                    name="provenances"
                                    render={arrayHelpers => (
                                        <Block>
                                            <Label1 marginBottom="8px">Provenances</Label1>
                                            <Block display="flex" justifyContent="space-between">
                                                <Input
                                                    type="text"
                                                    placeholder="Legg til provenance"
                                                    value={currentProvenanceValue}
                                                    onChange={event => setCurrentProvenanceValue(event.currentTarget.value)}
                                                    size="compact"
                                                />
                                                <Button
                                                    type="button"
                                                    shape={SHAPE.square}
                                                    size="compact"
                                                    onClick={() => arrayHelpers.push(currentProvenanceValue)}
                                                >
                                                    <Plus />
                                                </Button>
                                            </Block>


                                            {formikBag.values.provenances && formikBag.values.provenances.length > 0
                                                ? formikBag.values.provenances.map((provenance, index) => (
                                                    <Tag
                                                        key={provenance}
                                                        kind={KIND.primary}
                                                        onActionClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        {provenance}
                                                    </Tag>
                                                ))
                                                : null
                                            }
                                        </Block>
                                    )}
                                />
                            </FlexGridItem>

                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="description"
                                    render={({ field, form }: FieldProps<MyFormValues>) => (
                                        <Block>
                                            <Label1 marginBottom="8px">Description</Label1>
                                            <Textarea
                                                {...field}
                                                size={SIZE.compact}
                                                placeholder="Skriv inn beskrivelse"
                                            />
                                        </Block>

                                    )}
                                />
                            </FlexGridItem>


                        </FlexGrid>

                        <Block marginTop="50px">
                            <button type="submit" disabled={formikBag.isSubmitting}>
                                Submit
                            </button>
                        </Block>

                    </Form>
                )}
            />
        </div>
    );
};

export default DatasetForm