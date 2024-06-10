import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Stack, Checkbox, MenuItem, IconButton } from "@mui/material";
import * as Yup from "yup";
import {
  StyledInput,
  Label,
  HelperText,
  StyledFormControl,
  StyledFormControlLabel,
  StyledFormDateControl,
} from "./styles/workExperienceForm.styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  StyledSelect,
  StyledSelectFormControl,
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

interface WorkExperienceData {
  employerName: string;
  startDate: string;
  endDate: string;
  role: string;
  currentlyWorking: boolean;
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
  workExperience: Yup.array().of(
    Yup.object().shape({
      employerName: Yup.string().required("Employer name is required"),
      startDate: Yup.string()
        .required("Start year is required"),
        endDate: Yup.string()
        .when("currentlyWorking", (currentlyWorking, schema) => {
          return currentlyWorking
            ? schema
            : schema.required("End year is required unless currently working");
        }),
      role: Yup.string().required("Role is required"),
      currentlyWorking: Yup.boolean(),
    })
  ),
});

interface WorkExperienceFormProps {
  handleWorkExperienceSubmit: (data: WorkExperienceData[]) => void;
  validWorkExperience: (isValid: boolean) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ handleWorkExperienceSubmit, validWorkExperience }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [workExperience, setWorkExperience] = useState<WorkExperienceData[]>([{
    employerName: "",
    startDate: "",
    endDate: "",
    role: "",
    currentlyWorking: false,
  }]);

  return (
    <Formik
      initialValues={{
        workExperience,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setWorkExperience(values.workExperience);
        handleWorkExperienceSubmit(values.workExperience);
      }}
    >
      {({ values, handleChange, setFieldValue, validateForm }) => {
        useEffect(() => {
          const checkValidation = async () => {
            const errors = await validateForm();
            validWorkExperience(Object.keys(errors).length === 0);
          };
          checkValidation();
        }, [handleChange, values, setFieldValue, validateForm]);

        const currentYear = new Date().getFullYear();

        return (
          <Form>
            <FieldArray name="workExperience">
              {({ remove, push }) => (
                <>
                  {values.workExperience.map((field, index) => {
                    const startDate = parseInt(values.workExperience[index].startDate, 10) || currentYear;

                    return (
                      <FieldContainer key={index}>
                        <Stack mb={3} spacing={3}>
                          <Stack direction={isSmallScreen ? "column" : "row"} spacing={3}>
                            <StyledFormControl>
                              <Label required>Employer Name</Label>
                              <Field
                                as={StyledInput}
                                style={{ marginTop: 0 }}
                                name={`workExperience[${index}].employerName`}
                                placeholder="Enter employer name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChange(e);
                                  const newWorkExperience = [...values.workExperience];
                                  newWorkExperience[index].employerName = e.target.value;
                                  setWorkExperience(newWorkExperience);
                                }}
                                value={values.workExperience[index].employerName}
                              />
                              <ErrorMessage name={`workExperience[${index}].employerName`} component={HelperText} />
                            </StyledFormControl>
                            <StyledFormDateControl>
                              <Label required>Start Year</Label>
                              <StyledSelectFormControl fullWidth>
                                <Field
                                  as={StyledSelect}
                                  name={`workExperience[${index}].startDate`}
                                  displayEmpty
                                  inputProps={{ "aria-label": "Select start year" }}
                                >
                                  <MenuItem disabled value="">
                                    Select
                                  </MenuItem>
                                  {Array.from(
                                    { length: 20 },
                                    (_, i) => currentYear - i
                                  ).map((year) => (
                                    <MenuItem key={year} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </Field>
                                <ErrorMessage name={`workExperience[${index}].startDate`} component={HelperText} />
                              </StyledSelectFormControl>
                            </StyledFormDateControl>
                          </Stack>
                          <Stack direction={isSmallScreen ? "column" : "row"} spacing={3} mt={3} width={"100%"}>
                            <StyledFormControl>
                              <Label required>Role</Label>
                              <Field
                                as={StyledInput}
                                style={{ marginTop: 0 }}
                                name={`workExperience[${index}].role`}
                                placeholder="Enter your role"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChange(e);
                                  const newWorkExperience = [...values.workExperience];
                                  newWorkExperience[index].role = e.target.value;
                                  setWorkExperience(newWorkExperience);
                                }}
                                value={values.workExperience[index].role}
                              />
                              <ErrorMessage name={`workExperience[${index}].role`} component={HelperText} />
                            </StyledFormControl>
                            <StyledFormDateControl>
                              <Label required>End Year</Label>
                              <StyledSelectFormControl fullWidth>
                                <Field
                                  as={StyledSelect}
                                  name={`workExperience[${index}].endDate`}
                                  displayEmpty
                                  inputProps={{ "aria-label": "Select end year" }}
                                  disabled={values.workExperience[index].currentlyWorking}
                                >
                                  <MenuItem disabled value="">
                                    Select
                                  </MenuItem>
                                  {Array.from(
                                    { length: currentYear - startDate + 1 },
                                    (_, i) => startDate + i
                                  ).map((year) => (
                                    <MenuItem key={year} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </Field>
                                <ErrorMessage name={`workExperience[${index}].endDate`} component={HelperText} />
                              </StyledSelectFormControl>
                            </StyledFormDateControl>
                            <StyledFormControlLabel
                              control={
                                <Checkbox
                                  checked={values.workExperience[index].currentlyWorking}
                                  onChange={(e) => {
                                    const newWorkExperience = [...values.workExperience];
                                    newWorkExperience[index].currentlyWorking = e.target.checked;
                                    setFieldValue(`workExperience[${index}].currentlyWorking`, e.target.checked);
                                    setWorkExperience(newWorkExperience);
                                  }}
                                />
                              }
                              label="I currently work here"
                            />
                          </Stack>
                        </Stack>
                        {index > 0 && (
                          <DeleteIconButton
                            onClick={() => {
                              remove(index);
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
                    );
                  })}
                  <AddFieldButton
                    label="Add work experience"
                    icon={<AddIcon />}
                    onClick={() => {
                      const newField: WorkExperienceData = {
                        employerName: "",
                        startDate: "",
                        endDate: "",
                        role: "",
                        currentlyWorking: false,
                      };
                      push(newField);
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
