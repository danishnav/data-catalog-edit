import * as React from 'react';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps, FieldArray } from 'formik';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {BlockProps, Block} from 'baseui/block';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {LightTheme} from 'baseui';
import { StatefulMenu } from 'baseui/menu';
import {List, arrayMove} from 'baseui/dnd-list';
import {Button, KIND, SHAPE} from 'baseui/button';
import { Label1 } from 'baseui/typography';

import Codelist from '../mockCodelist'

interface MyFormValues {
  title: string;
  contentType: string;
  spatial: string;
  publisher: string;
  provenances: Array<string>;
}

let initialFormValues = { 
    title: '',
    contentType: '',
    spatial: '',
    publisher: '',
    provenances: [''],
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
                    flexGridColumnCount={4}
                    flexGridColumnGap="scale1200"
                    flexGridRowGap="scale1000"
                >
                    <FlexGridItem {...itemProps}>
                        <Field
                            name="title"
                            render={({ field, form }: FieldProps<MyFormValues>) => (
                                <FormControl label="Title">
                                    <Input {...field} size="compact"/>
                                </FormControl>
                            )}
                        />
                    </FlexGridItem>
                    <FlexGridItem {...itemProps}>
                        <Field
                            name="contentType"
                            render={({ field, form }: FieldProps<MyFormValues>) => (
                                <FormControl label="Type">
                                    <Input {...field}  size="compact" />
                                </FormControl>
                            )}
                        />
                    </FlexGridItem>
                    <FlexGridItem {...itemProps}>
                        <Field
                            name="spatial"
                            render={({ field, form }: FieldProps<MyFormValues>) => (
                                <FormControl label="Spatial">
                                    <Input {...field}  size="compact" />
                                </FormControl>
                            )}
                        />
                    </FlexGridItem>
                    <FlexGridItem {...itemProps}>
                        <Field
                            name="publisher"
                            render={({ field, form }: FieldProps<MyFormValues>) => (
                                <FormControl label="Publisher">
                                    <Input {...field}  size="compact" />
                                </FormControl>
                            )}
                        />
                    </FlexGridItem>

                    <FlexGridItem {...itemProps}>
                        <FieldArray
                            name="provenances"
                            render={arrayHelpers => (
                                <div>
                                    <Block display="flex" justifyContent="space-between" alignItems="center">
                                        <Label1>Categories</Label1>
                                        <Button 
                                                type="button" 
                                                kind={KIND.minimal}
                                                shape={SHAPE.round}
                                                size="compact"
                                                onClick={() => arrayHelpers.push('')}
                                            >+</Button>
                                    </Block>

                                    {formikBag.values.provenances.length > 0 ? formikBag.values.provenances.map((provenance, index) => (
                                        <Block key={index} marginBottom="1rem">
                                            <Field 
                                                name={`provenances[${index}]`} 
                                                render={({ field, form }: FieldProps<MyFormValues>) => (
                                                    <Input {...field}  size="compact" />
                                                )}
                                            />
                                        </Block>
                                    )): null}
                                </div>
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