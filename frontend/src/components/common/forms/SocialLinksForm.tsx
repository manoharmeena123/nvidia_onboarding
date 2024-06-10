import React, { useEffect, useState } from "react";
import { Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import {
  StyledFormControl,
  Label,
  HelperText,
  StyledInput,
} from "./styles/socialLinkForm.style";
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
  socialAccounts: Yup.array().of(
    Yup.string().url("Enter a valid URL").required("This field is required")
  ),
});

interface SocialLinksFormProps {
  handleSocialLinksSubmit: (data: string[]) => void;
}

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ handleSocialLinksSubmit }) => {
  const theme = useTheme();
  const [socialAccounts, setSocialAccounts] = useState<string[]>([""]);

  return (
    <Formik
      initialValues={{ socialAccounts }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSocialAccounts(values.socialAccounts);
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        useEffect(() => {
          handleSocialLinksSubmit(socialAccounts);
        }, [values, handleChange, setFieldValue]);

        return (
          <Form>
            <FieldArray name="socialAccounts">
              {() => (
                <>
                  {values.socialAccounts.map((account, index) => (
                    <FieldContainer key={index}>
                      <Stack>
                        <StyledFormControl>
                          <Label>Social Account {index + 1}</Label>
                          <Field
                            as={StyledInput}
                            style={{ marginTop: 0 }}
                            name={`socialAccounts[${index}]`}
                            placeholder="Enter URL"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              handleChange(e);
                              const newSocialAccounts = [...values.socialAccounts];
                              newSocialAccounts[index] = e.target.value;
                              setSocialAccounts(newSocialAccounts);
                            }}
                            value={values.socialAccounts[index]}
                          />
                          <ErrorMessage name={`socialAccounts[${index}]`} component={HelperText} />
                        </StyledFormControl>
                      </Stack>
                      {index > 0 && (
                        <DeleteIconButton
                          style={{ color: "white" }}
                          onClick={() => {
                            const newSocialAccounts = [...values.socialAccounts];
                            newSocialAccounts.splice(index, 1);
                            setFieldValue("socialAccounts", newSocialAccounts);
                            setSocialAccounts(newSocialAccounts);
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
                    label="Add social account"
                    icon={<AddIcon />}
                    onClick={() => {
                      const newSocialAccounts = [...values.socialAccounts, ""];
                      setFieldValue("socialAccounts", newSocialAccounts);
                      setSocialAccounts(newSocialAccounts);
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
