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

import { DatasetFormValues } from '../constants'
import Codelist from "../mockCodelist";

type FormProps = {
    formInitialValues: DatasetFormValues | any;
    submit: Function;
    isEdit?: boolean;
};

const rowBlockProps: BlockProps = {
    display: "flex"
};
const itemProps: BlockProps = {
    overrides: {
        Block: {
            style: ({ $theme }) => ({
                width: `calc((100% - ${$theme.sizing.scale800}) / 3)`,
                marginBottom: "2rem"
            })
        }
    }
};

function renderTagList(list: any[] | null, arrayHelpers: FieldArrayRenderProps) {
    return (
        <React.Fragment>
            {list && list.length > 0
                ? list.map((item, index) => (
                    <React.Fragment key={index}>
                        {item ? (
                            <Tag
                                key={item}
                                kind={KIND.primary}
                                onActionClick={() => arrayHelpers.remove(index)}
                            >
                                {item}
                            </Tag>
                        ) : null}
                    </React.Fragment>
                ))
                : null}
        </React.Fragment>
    );
}

const DatasetForm = ({ formInitialValues, submit, isEdit }: FormProps) => {
    const [value, setValue] = React.useState<Value>([]);
    const [currentProvenanceValue, setCurrentProvenanceValue] = React.useState([]);
    const [currentKeywordValue, setCurrentKeywordValue] = React.useState("");
    const [currentPurposeValue, setPurposeValue] = React.useState("");
    const [currentLegalbasisValue, setLegalbasisValue] = React.useState("");


    const getParsedOptions = (codelist: object | undefined, provenances: any | undefined) => {
        if (!codelist) return [];

        let parsedOptions = Object.keys(codelist).reduce((acc: any, curr: any) => {
            return [...acc, { id: curr }];
        }, [])

        return parsedOptions.filter(option =>
            provenances.includes(option.id) ? null : option.id
        );
    };

    return (
        <React.Fragment>
            <Formik
                initialValues={formInitialValues}
                enableReinitialize
                onSubmit={(
                    values: DatasetFormValues,
                    actions: FormikActions<DatasetFormValues>
                ) => {
                    submit(values);
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
                render={(formikBag: FormikProps<DatasetFormValues>) => (
                    <Form>
                        <FlexGrid
                            flexGridColumnCount={3}
                            flexGridColumnGap="scale1200"
                            flexGridRowGap="scale800"
                        >
                            <FlexGridItem>
                                <Field
                                    name="title"
                                    render={({
                                        field,
                                        form
                                    }: FieldProps<DatasetFormValues>) => (
                                            <FormControl label="Title">
                                                <Input {...field} size="compact" />
                                            </FormControl>
                                        )}
                                />
                            </FlexGridItem>
                            <FlexGridItem>
                                <Field
                                    name="contentType"
                                    render={({
                                        field,
                                        form
                                    }: FieldProps<DatasetFormValues>) => (
                                            <FormControl label="Type">
                                                <Input {...field} size="compact" />
                                            </FormControl>
                                        )}
                                />
                            </FlexGridItem>
                            <FlexGridItem>
                                <Field
                                    name="pi"
                                    render={({
                                        field,
                                        form
                                    }: FieldProps<DatasetFormValues>) => (
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
                                        <Block>
                                            <Block>
                                                <Label1 marginBottom="8px">
                                                    Categories
                                                </Label1>
                                                <Select
                                                    options={getParsedOptions(
                                                        Codelist.CATEGORY,
                                                        formikBag.values.categories
                                                    )}
                                                    type={TYPE.search}
                                                    labelKey="id"
                                                    valueKey="id"
                                                    openOnClick={false}
                                                    maxDropdownHeight="300px"
                                                    onChange={({ option }) => { arrayHelpers.push(option ? option.id : null); }}
                                                    value={value}
                                                    size="compact"
                                                />
                                            </Block>
                                            {renderTagList(formikBag.values.categories, arrayHelpers)}
                                        </Block>
                                    )}
                                />
                            </FlexGridItem>
                            <FlexGridItem display="none" />
                            <FlexGridItem {...itemProps}>
                                <FieldArray
                                    name="provenances"
                                    render={arrayHelpers => (
                                        <Block>
                                            <Block>
                                                <Label1 marginBottom="8px">
                                                    Provenances
                                                </Label1>
                                                <Select
                                                    options={getParsedOptions(
                                                        Codelist.PROVENANCE,
                                                        formikBag.values.provenances
                                                    )}
                                                    type={TYPE.search}
                                                    labelKey="id"
                                                    valueKey="id"
                                                    openOnClick={false}
                                                    maxDropdownHeight="300px"
                                                    onChange={({ option }) => {
                                                        arrayHelpers.push(
                                                            option
                                                                ? option.id
                                                                : null
                                                        );
                                                    }}
                                                    value={currentProvenanceValue}
                                                    size="compact"
                                                />
                                            </Block>
                                            {renderTagList(formikBag.values.provenances, arrayHelpers)}
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
                                                            onClick={() =>
                                                                arrayHelpers.push(currentKeywordValue)}
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    )
                                                }}
                                            />
                                            {renderTagList(formikBag.values.keywords, arrayHelpers)}
                                        </Block>
                                    )}
                                />
                            </FlexGridItem>
                            <FlexGridItem display="none" />
                            <FlexGridItem {...itemProps}>
                                <Field
                                    name="description"
                                    render={({ field, form }: FieldProps<DatasetFormValues>) => (
                                        <Block>
                                            <Label1 marginBottom="8px">Beskrivelse</Label1>
                                            <Textarea
                                                {...field}
                                                placeholder="Legg inn beskrivelse av datasettet"
                                                size={SIZE.compact}
                                                rows={5}
                                            />
                                        </Block>

                                    )}
                                />
                            </FlexGridItem>


                            {isEdit ? (
                                <React.Fragment>
                                    <FlexGridItem display="none" />
                                    <FlexGridItem marginTop="20px">
                                        <FieldArray
                                            name="policies"
                                            render={arrayHelpers => (
                                                <React.Fragment>
                                                    <Block marginBottom="1rem">
                                                        <h2>Behandlingsgrunnlag</h2>
                                                    </Block>

                                                    <Block display="flex" marginBottom="2rem">
                                                        <Block width="100%" marginRight="4rem">
                                                            <Input
                                                                type="text"
                                                                placeholder="Legg til formål"
                                                                value={currentPurposeValue}
                                                                onChange={event => setPurposeValue(event.currentTarget.value)}
                                                                size="compact"
                                                            />
                                                        </Block>
                                                        <Block width="100%" marginRight="3rem">
                                                            <Input
                                                                type="text"
                                                                placeholder="Legg til rettslig grunnlag"
                                                                value={currentLegalbasisValue}
                                                                onChange={event => setLegalbasisValue(event.currentTarget.value)}
                                                                size="compact"
                                                            />
                                                        </Block>
                                                        <Block width="100%">
                                                            <Button
                                                                type="button"
                                                                size={SIZE.compact}
                                                                onClick={() => {   
                                                                    arrayHelpers.push({
                                                                        datasetTitle: formikBag.values.title,
                                                                        purposeCode: currentPurposeValue,
                                                                        legalBasisDescription: currentLegalbasisValue
                                                                    })
                                                                    setPurposeValue('')
                                                                    setLegalbasisValue('')
                                                                }
                                                                }
                                                            >
                                                                Legg til
                                                            </Button>
                                                        </Block>

                                                    </Block>

                                                </React.Fragment>
                                            )}
                                        />
                                    </FlexGridItem>
                                    <FlexGridItem display="none" />
                                </React.Fragment>

                            ) : null}
                        </FlexGrid>

                        <Block marginTop="2rem" width="100%">
                            <Button
                                type="submit"
                                overrides={{
                                    BaseButton: {
                                        style: ({ $theme }) => {
                                            return {
                                                backgroundColor: $theme.colors.primary400,
                                                alignContent: "center",
                                                paddingRight: "3rem",
                                                paddingLeft: "3rem"
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
        </React.Fragment>
    );
};

export default DatasetForm;
