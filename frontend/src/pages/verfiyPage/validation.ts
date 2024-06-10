import * as Yup from "yup";
import { isValid } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";

const countryZipCodeRegexes: { [key: string]: RegExp } = {
  US: /^[0-9]{5}(?:-[0-9]{4})?$/,
  CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
  // Add other country regexes here
};

const getCountryZipCodeRegex = (country: string): RegExp => {
  return countryZipCodeRegexes[country] || /.*/;
};

const nameRegex = /^[a-zA-Z]+$/;

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(nameRegex, "Please avoid spaces, special characters and numbers")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name cannot exceed 50 characters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(
      nameRegex,
      "Last Name cannot contain spaces, special characters, or numbers"
    )
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name cannot exceed 50 characters")
    .required("Last Name is required"),
  phone_number: Yup.string()
    .required("Phone Number is required")
    .test("is-valid-phone", "Phone number is not valid", function (value) {
      if (!value) {
        return false;
      }
      return isValidPhoneNumber(value);
    }),
  lived_in_country: Yup.string().required("Country is required"),
  worked_in_country: Yup.string().required("Country is required"),
  state: Yup.string().when("livedInCountry", {
    is: (value: any) => {
      return value === "US";
    }, // Adjust the condition as needed
    then: (schema) => schema.required("State is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  city: Yup.string().when("livedInCountry", {
    is: (value: any) => value === "US", // Adjust the condition as needed
    then: (schema) => schema.required("City is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  address_line1: Yup.string().required("Address Line 1 is required"),
  zip_code: Yup.string().when("livedInCountry", {
    is: (value: any) => value === "US", // Adjust the condition as needed
    then: (schema) =>
      schema
        .required("Zip code is required")
        .test("is-valid-zip", "Zip code is not valid", function (value) {
          const { path, createError } = this;
          const country = this.parent.livedInCountry;
          const zipCodeRegex = getCountryZipCodeRegex(country);
          return (
            zipCodeRegex.test(value) ||
            createError({ path, message: "Zip code is not valid" })
          );
        }),
    otherwise: (schema) => schema.nullable(),
  }),
  date_of_birth: Yup.string()
    .nullable()
    .test("is-valid-date", "Invalid date format", function (value) {
      return value ? isValid(new Date(value)) : false;
    })
    .required("Date of Birth is required"),
});
