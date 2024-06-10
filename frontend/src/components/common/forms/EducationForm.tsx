import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { MenuItem, Stack, IconButton } from "@mui/material";
import * as Yup from "yup";
import {
  StyledInput,
  StyledSelect,
  Label,
  HelperText,
  StyledFormControl,
  StyledSelectFormControl
} from "./styles/education.style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AddFieldButton } from "@components/common/index";
import AddIcon from "@mui/icons-material/Add";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import styled from "styled-components";
import { useAppStore } from "@zustand-store/userStore/useAppStore";
interface DeleteIconButtonProps {
  top?: string;
  right?: string;
  smallTop?: string;
  smallRight?: string;
}

interface EducationData {
  institution: string;
  concentration: string;
  degree: string;
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
  education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string().required("Institution is required"),
      concentration: Yup.string().required("Concentration is required"),
      degree: Yup.string().required("Degree is required")
    })
  )
});

interface EducationFormProps {
  handleEducationSubmit: (data: EducationData[]) => void;
  validEducationForm: (isValid: boolean) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  handleEducationSubmit,
  validEducationForm
}) => {
  const theme = useTheme();
  const { setFormdata, setIsFormValid } = useAppStore();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [education, setEducation] = useState<EducationData[]>([
    { institution: "", concentration: "", degree: "" }
  ]);

  return (
    <Formik
      initialValues={{
        education
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setEducation(values.education);
      }}
    >
      {({ values, handleChange, setFieldValue, validateForm, touched }) => {
        useEffect(() => {
          const checkValidation = async () => {
            const errors = await validateForm();
            validEducationForm(Object.keys(errors).length === 0);
          };
          checkValidation();
        }, [
          values,
          touched,
          handleChange,
        ]);
        useEffect(() => {
          handleEducationSubmit(education);
        }, [values, handleChange, setFieldValue]);
        return (
          <Form>
            <FieldArray name="education">
              {() => (
                <>
                  {values.education.map((field, index) => (
                    <FieldContainer key={index}>
                      <Stack mb={3}>
                        <Stack>
                          <StyledFormControl>
                            <Label required>Institution</Label>
                            <Field
                              as={StyledInput}
                              style={{ marginTop: 0 }}
                              name={`education[${index}].institution`}
                              placeholder="Enter educational institution name"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleChange(e);
                                // Additionally, update the local state directly
                                const newEducation = [...values.education];
                                newEducation[index].institution =
                                  e.target.value;
                                setEducation(newEducation);
                              }}
                              value={values.education[index].institution}
                            />
                            <ErrorMessage
                              name={`education[${index}].institution`}
                              component={HelperText}
                            />
                          </StyledFormControl>
                        </Stack>
                        <Stack
                          direction={isSmallScreen ? "column" : "row"}
                          spacing={3}
                          mt={3}
                          width={"592px"}
                        >
                          <StyledFormControl required>
                            <Label required>Concentration</Label>
                            <Field
                              as={StyledInput}
                              style={{ marginTop: 0 }}
                              name={`education[${index}].concentration`}
                              aria-label="Concentration"
                              placeholder="E.g., Computer Science"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleChange(e);
                                const newEducation = [...values.education];
                                newEducation[index].concentration =
                                  e.target.value;
                                setEducation(newEducation);
                              }}
                              value={values.education[index].concentration}
                            />
                            <ErrorMessage
                              name={`education[${index}].concentration`}
                              component={HelperText}
                            />
                          </StyledFormControl>
                          <StyledSelectFormControl required>
                            <Label required>Degree</Label>
                            <Field
                              style={{ marginTop: 0, color: "#00004" }}
                              as={StyledSelect}
                              name={`education[${index}].degree`}
                              value={values.education[index].degree}
                              onChange={(
                                e: React.ChangeEvent<{ value: unknown }>
                              ) => {
                                handleChange(e);
                                const newEducation = [...values.education];
                                newEducation[index].degree = e.target
                                  .value as string;
                                setEducation(newEducation);
                              }}
                              displayEmpty
                              aria-label="Degree"
                            >
                              <MenuItem value="" disabled>
                                Select degree
                              </MenuItem>
                              <MenuItem value="bachelors">Bachelors</MenuItem>
                              <MenuItem value="masters">Masters</MenuItem>
                              <MenuItem value="phd">Ph.D.</MenuItem>
                            </Field>
                            <ErrorMessage
                              name={`education[${index}].degree`}
                              component={HelperText}
                            />
                          </StyledSelectFormControl>
                        </Stack>
                      </Stack>
                      {index > 0 && (
                        <DeleteIconButton
                          style={{ color: "white" }}
                          onClick={() => {
                            const newEducation = [...values.education];
                            newEducation.splice(index, 1);
                            setFieldValue("education", newEducation);
                            setEducation(newEducation);
                          }}
                          top="8rem"
                          right="1rem"
                          smallTop="12rem"
                          smallRight="1rem"
                        >
                          <CancelSharpIcon />
                        </DeleteIconButton>
                      )}
                    </FieldContainer>
                  ))}
                  <AddFieldButton
                    label="Add education"
                    icon={<AddIcon />}
                    onClick={() => {
                      const newField = {
                        institution: "",
                        concentration: "",
                        degree: ""
                      };
                      const newEducation = [...values.education, newField];
                      setFieldValue("education", newEducation);
                      setEducation(newEducation);
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
