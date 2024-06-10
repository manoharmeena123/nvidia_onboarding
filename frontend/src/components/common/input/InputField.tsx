import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import { createChangeEvent } from "@utils/createChangeEvent";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerComponent } from "./DatePicker";
import {
  StyledInput,
  Label,
  HelperText,
  StyledFormControl,
  StyledMuiPhoneNumber,
} from "./style";

interface BasicFormControlProps {
  values: {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  };
  errors: FormikErrors<{
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  }>;
  touched: FormikTouched<{
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  }>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
}

export const BasicFormControl: React.FC<BasicFormControlProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const today = dayjs();
  console.log('value', values)
  return (
    <>
      <StyledFormControl>
        <Label>First Name*</Label>
        <StyledInput
          name="firstname"
          placeholder="Write your name here"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.firstname && errors.firstname && (
          <HelperText>{errors.firstname}</HelperText>
        )}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Last Name*</Label>
        <StyledInput
          name="lastname"
          placeholder="Write your name here"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.lastname && errors.lastname && (
          <HelperText>{errors.lastname}</HelperText>
        )}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Email*</Label>
        <StyledInput
          name="email"
          placeholder="apatil@labelbox.com"
          value={values.email}
          readOnly
          disabled
        />
        {touched.email && errors.email && (
          <HelperText>{errors.email}</HelperText>
        )}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Date of birth*</Label>
        <DatePickerComponent onBlur={() => null} maximumDate={today} value={null} onChange={function (value: Dayjs | null): void {
          throw new Error("Function not implemented.");
        } } />
      </StyledFormControl>
      <StyledFormControl>
        <Label>Phone Number*</Label>
        <StyledMuiPhoneNumber
          id="phone-number"
          name="phoneNumber"
          defaultCountry="us"
          value={values.phoneNumber}
          onChange={(value: string) =>
            handleChange(createChangeEvent("phoneNumber", value))
          }
          onBlur={handleBlur}
          fullWidth
          required
          variant="outlined"
          margin="normal"
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <HelperText>{errors.phoneNumber}</HelperText>
        )}
      </StyledFormControl>
    </>
  );
};
