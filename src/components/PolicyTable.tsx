import * as React from 'react';
import { withStyle, useStyletron } from 'baseui';
import {
    StyledTable,
    StyledHead,
    StyledHeadCell,
    StyledBody,
    StyledRow,
    StyledCell,
} from 'baseui/table';
import { Block } from 'baseui/block';
import { Policy, DatasetFormValues } from '../constants'

import { Field, FieldProps } from "formik";
import { Input, SIZE } from "baseui/input";
import { Delete } from "baseui/icon";
import { Button, KIND as BUTTONKIND } from 'baseui/button';
import { KIND } from 'baseui/tag';
import { NONAME } from 'dns';

const StyledBodyCell = withStyle(StyledCell, {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingBottom: '1rem',
    borderBottom: '2px solid #E9E7E7'
  })

  const StyledBodyRow = withStyle(StyledCell, {
    backgroundColor: 'transparent',
    borderBottom: '1px solid #E9E7E7',
    display: 'flex',
    alignItems: 'center'
  })

let DATA = [
    ['Marlyn', 10],
    ['Luther', 15],
    ['Kiera', 13],
    ['Edna', 20],
    ['Soraya', 18],
    ['Dorris', 32],
    ['Astrid', 26],
    ['Wendie', 17],
    ['Marna', 11],
    ['Malka', 14],
    ['Jospeh', 10],
    ['Roselee', 12],
    ['Justine', 35],
    ['Marlon', 30],
    ['Mellissa', 32],
    ['Fausto', 21],
    ['Alfredia', 22],
    ['Abel', 18],
    ['Winford', 19],
    ['Neil', 27],
];

type TableProps = {
    policies: any | undefined;
};

const PolicyTable = ({ policies }: TableProps) => {
    const [useCss, theme] = useStyletron();
    return (
        <StyledTable className={useCss({ marginBottom: '2rem', overflow: 'hidden !important' })}>

            <StyledHead>
                <StyledHeadCell>Formål</StyledHeadCell>
                <StyledHeadCell>Beskrivelse</StyledHeadCell>
                <StyledHeadCell></StyledHeadCell>
            </StyledHead>

            <StyledBody>
                {policies ? policies.map((row: any, index: number) => (
                    <StyledBodyRow key={index}>
                            <StyledCell>
                                {/* <Field
                                    name={`policies[${index}].purposeCode`}
                                    render={({ field, form }: FieldProps<DatasetFormValues>) => (
                                        <Input {...field} size="compact" />
                                    )}
                                /> */}

                                {row.purposeCode}
                            </StyledCell>

                            <StyledCell>
                                {/* <Field
                                    name={`policies[${index}].legalBasisDescription`}
                                    render={({
                                        field, form }: FieldProps<DatasetFormValues>) => (
                                            <Input {...field} size="compact" />
                                        )}
                                /> */}
                                {row.legalBasisDescription}

                            </StyledCell>

                            <StyledCell>
                                <Block width="100%" display="flex" justifyContent="flex-end">
                                    <Button
                                        type="button"
                                        size={SIZE.compact}
                                        kind={BUTTONKIND.tertiary}
                                        overrides={{
                                            BaseButton: {
                                                style: ({ $theme }) => {
                                                    return {
                                                        backgroundColor: $theme.colors.warning300,
                                                        color: 'white',
                                                        height: '2rem'
                                                    };
                                                }
                                            }
                                        }}
                                    >
                                        <Delete size={20} />
                                    </Button>
                                </Block>
                            </StyledCell>

                    </StyledBodyRow>
                )) : null}
            </StyledBody>
        </StyledTable>
    );

}

export default PolicyTable