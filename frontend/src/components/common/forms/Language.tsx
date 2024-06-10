import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Stack, MenuItem, IconButton } from "@mui/material";
import * as Yup from "yup";
import {
  StyledFormControl,
  StyledInput,
  Label,
  HelperText
} from "./styles/language.style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  StyledSelect,
  StyledSelectFormControl
} from "./styles/education.style";
import { AddFieldButton } from "@components/common/index";
import AddIcon from "@mui/icons-material/Add";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import styled from "styled-components";

interface DeleteIconButtonProps {
  top?: string;
  right?: string;
  smallTop?: string;
  smallRight?: string;
}

interface LanguageData {
  language: string;
  fluency: string;
}

const FieldContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const DeleteIconButton = styled(IconButton)<DeleteIconButtonProps>`
  position: absolute;
  top: ${(props) => props.top || "2.5rem"};
  right: ${(props) => props.right || "2.5rem"};
  color: inherit;
  ${(props) => props.theme.breakpoints.down("sm")} {
    top: ${(props) => props.smallTop || "1rem"};
    right: ${(props) => props.smallRight || "1rem"};
  }
`;

const validationSchema = Yup.object({
  languageData: Yup.array().of(
    Yup.object().shape({
      language: Yup.string().required("This field is required"),
      fluency: Yup.string().required("This field is required")
    })
  )
});

interface LanguageFormProps {
  handleLanguageSubmit: (data: LanguageData[]) => void;
  validLanguageForm: (isValid: boolean) => void;
}

export const LanguageForm: React.FC<LanguageFormProps> = ({
  handleLanguageSubmit,
  validLanguageForm
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [languageData, setLanguageData] = useState<LanguageData[]>([
    { language: "", fluency: "" }
  ]);

  return (
    <Formik
      initialValues={{
        languageData
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setLanguageData(values.languageData);
      }}
    >
      {({ values, handleChange, setFieldValue, validateForm, touched }) => {
        useEffect(() => {
          const checkValidation = async () => {
            const errors = await validateForm();
            validLanguageForm(Object.keys(errors).length === 0);
          };
          checkValidation();
        }, [handleChange, values, validateForm, touched]);
        useEffect(() => {
          handleLanguageSubmit(languageData);
        }, [values, handleChange, setFieldValue]);

        return (
          <Form>
            <FieldArray name="languageData">
              {() => (
                <>
                  {values.languageData.map((field, index) => (
                    <FieldContainer key={index}>
                      <Stack
                        direction={isSmallScreen ? "column" : "row"}
                        spacing={2}
                        mb={3}
                      >
                        <StyledFormControl required>
                          <Label required>Language</Label>
                          <Field
                            as={StyledInput}
                            style={{ marginTop: 0 }}
                            name={`languageData[${index}].language`}
                            aria-label="Language"
                            placeholder="E.g., German"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(e);
                              const newLanguageData = [...values.languageData];
                              newLanguageData[index].language = e.target.value;
                              setLanguageData(newLanguageData);
                            }}
                            value={values.languageData[index].language}
                          />
                          <ErrorMessage
                            name={`languageData[${index}].language`}
                            component={HelperText}
                          />
                        </StyledFormControl>
                        <StyledSelectFormControl required>
                          <Label required>Fluency</Label>
                          <Field
                            style={{ marginTop: 0, color: "black !important" }}
                            as={StyledSelect}
                            displayEmpty
                            name={`languageData[${index}].fluency`}
                            onChange={(
                              e: React.ChangeEvent<{ value: unknown }>
                            ) => {
                              handleChange(e);
                              const newLanguageData = [...values.languageData];
                              newLanguageData[index].fluency = e.target
                                .value as string;
                              setLanguageData(newLanguageData);
                            }}
                            value={values.languageData[index].fluency}
                            aria-label="Fluency"
                          >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="basic">Basic</MenuItem>
                            <MenuItem value="conversational">
                              Conversational
                            </MenuItem>
                            <MenuItem value="fluent">Fluent</MenuItem>
                            <MenuItem value="native">Native</MenuItem>
                          </Field>
                          <ErrorMessage
                            name={`languageData[${index}].fluency`}
                            component={HelperText}
                          />
                        </StyledSelectFormControl>
                      </Stack>
                      {index > 0 && (
                        <DeleteIconButton
                          style={{ color: "white" }}
                          onClick={() => {
                            const newLanguageData = [...values.languageData];
                            newLanguageData.splice(index, 1);
                            setFieldValue("languageData", newLanguageData);
                            setLanguageData(newLanguageData);
                          }}
                          top="2rem"
                          right="1rem"
                          smallTop="4rem"
                          smallRight="1rem"
                        >
                          <CancelSharpIcon />
                        </DeleteIconButton>
                      )}
                    </FieldContainer>
                  ))}
                  <AddFieldButton
                    label="Add language"
                    icon={<AddIcon />}
                    onClick={() => {
                      const newField: LanguageData = {
                        language: "",
                        fluency: ""
                      };
                      const newLanguageData = [
                        ...values.languageData,
                        newField
                      ];
                      setFieldValue("languageData", newLanguageData);
                      setLanguageData(newLanguageData);
                    }}
                  />
                </>
              )}
            </FieldArray>
          </Form>
        );
      }}
    </Formik>
  );
};
