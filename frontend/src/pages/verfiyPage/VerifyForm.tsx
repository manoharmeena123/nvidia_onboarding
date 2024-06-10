import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import dayjs from "dayjs";
import _ from "lodash";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Country, State, City } from "country-state-city";
import {
  StyledInput,
  Label,
  HelperText,
  StyledFormControl,
  StyledMuiPhoneNumber,
} from "./style";
import { DatePickerComponent } from "@components/common/input/DatePicker";
import { useAppStore } from "@zustand-store/userStore/useAppStore";
import { validationSchema } from "./validation";
import { CityOption, CountryOption, InitialValues, StateOption } from "./types";
import { isAnyValueFilled } from "@utils/lodashUtilities";

const VerifyForm = () => {
  const theme = useTheme();
  const { setIsFormValid, setFormdata, formData } = useAppStore();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [initialValues, setInitialValues] = useState<InitialValues>({
    first_name: formData?.user?.first_name || "",
    last_name: formData?.user?.last_name || "",
    email: formData?.user?.email || "",
    phone_number: "",
    lived_in_country: "",
    worked_in_country: "",
    state: "",
    city: "",
    address_line1: "",
    address_line2: "",
    zip_code: "",
    date_of_birth: null,
  });
  const [selectedlived_in_country, setSelectedlived_in_country] =
    useState<SingleValue<CountryOption>>(null);
  const [selectedWorkedInCountry, setSelectedWorkedInCountry] =
    useState<SingleValue<CountryOption>>(null);
  const [selectedState, setSelectedState] =
    useState<SingleValue<StateOption>>(null);
  const [selectedCity, setSelectedCity] =
    useState<SingleValue<CityOption>>(null);
  const [phoneNum, setPhoneNum] = useState<string>("");
  console.log("**********************************", phoneNum);
  const countryOptions: CountryOption[] = Country.getAllCountries().map(
    (country) => ({
      isoCode: country.isoCode,
      name: country.name,
    })
  );

  useEffect(() => {
    if (isAnyValueFilled(formData?.verifyForm)) {
      console.log("formdata", formData);
      const {
        phone_number,
        lived_in_country,
        worked_in_country,
        state,
        city,
        address_line1,
        address_line2,
        zip_code,
        date_of_birth,
      } = formData.verifyForm;
      setInitialValues({
        first_name: formData?.user?.first_name || "",
        last_name: formData?.user?.last_name || "",
        email: formData?.user?.email || "",
        phone_number: phone_number || "",
        lived_in_country: lived_in_country || "",
        worked_in_country: worked_in_country || "",
        state: state || "",
        city: city || "",
        address_line1: address_line1 || "",
        address_line2: address_line2 || "",
        zip_code: zip_code || "",
        date_of_birth: dayjs(date_of_birth) || null,
      });
    }
  }, [formData]);

  return (
    <Box
      sx={{
        backgroundColor: "bodyColor.main",
        color: "#000",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        pb: 5,
      }}
    >
      <Container sx={{ margin: "auto" }} component="main" maxWidth="md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
          enableReinitialize
          validateOnMount
          validateOnChange
          validateOnBlur
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isValid,
            validateForm,
          }) => {
            useEffect(() => {
              validateForm().then((validationErrors) => {
                console.log(
                  "valuyyss",
                  validationErrors,
                  Object.keys(validationErrors).length === 0
                );
                if (Object.keys(validationErrors).length === 0) {
                  setIsFormValid(true);
                  setFormdata("verifyForm", values, "object");
                } else {
                  setIsFormValid(false);
                }
              });
            }, [
              values,
              validateForm,
              setIsFormValid,
              handleChange,
              handleBlur,
              touched,
            ]);

            const handleInputChange = (e: any) => {
              console.log("phone", e);
              handleChange(e);
              validateForm();
            };

            const handlelived_in_countryChange = (
              item: SingleValue<CountryOption>
            ) => {
              setSelectedlived_in_country(item);
              setSelectedState(null);
              setSelectedCity(null);
              setFieldValue("lived_in_country", item?.isoCode || "");
              validateForm();
            };

            const handleWorkedInCountryChange = (
              item: SingleValue<CountryOption>
            ) => {
              setSelectedWorkedInCountry(item);
              setSelectedState(null);
              setSelectedCity(null);
              setFieldValue("worked_in_country", item?.isoCode || "");
              validateForm();
            };

            const stateOptions: StateOption[] = selectedlived_in_country
              ? State.getStatesOfCountry(selectedlived_in_country.isoCode).map(
                  (state) => ({
                    isoCode: state.isoCode,
                    name: state.name,
                  })
                )
              : [];

            const cityOptions: CityOption[] = selectedState
              ? City.getCitiesOfState(
                  selectedlived_in_country?.isoCode || "",
                  selectedState.isoCode
                ).map((city) => ({
                  name: city.name,
                }))
              : [];

            return (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "368px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    sx={{
                      alignSelf: "flex-start",
                      color: "text.primary",
                      mb: 5,
                      mt: 5,
                    }}
                  >
                    Basic information
                  </Typography>

                  <StyledFormControl>
                    <Label>First Name*</Label>
                    <Field
                      name="first_name"
                      as={StyledInput}
                      placeholder="Write your name here"
                      onChange={handleInputChange}
                    />
                    {touched.first_name && errors.first_name && (
                      <HelperText sx={{ mt: 1, mb: 0 }}>
                        {errors.first_name}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Last Name*</Label>
                    <Field
                      name="last_name"
                      as={StyledInput}
                      placeholder="Write your name here"
                      onChange={handleInputChange}
                    />
                    {touched.last_name && errors.last_name && (
                      <HelperText sx={{ mt: 1, mb: 0 }}>
                        {errors.last_name}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Email*</Label>
                    <Field
                      name="email"
                      as={StyledInput}
                      placeholder="apatil@labelbox.com"
                      readOnly
                      disabled
                    />
                    {touched.email && errors.email && (
                      <HelperText sx={{ mt: 1, mb: 0 }}>
                        {errors.email}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Date of Birth*</Label>
                    <Field name="date_of_birth">
                      {({
                        field,
                        form: { setFieldValue, setFieldTouched },
                      }: FieldProps<string, FormikProps<any>>) => (
                        <DatePickerComponent
                          value={values.date_of_birth ?? null}
                          onChange={(value: any) => {
                            setFieldValue(field.name, value);
                            validateForm();
                          }}
                          onBlur={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                          maximumDate={undefined}
                        />
                      )}
                    </Field>
                    {touched.date_of_birth && errors.date_of_birth && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.date_of_birth}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Phone Number*</Label>
                    <StyledMuiPhoneNumber
                      id="phone_number"
                      name="phone_number"
                      defaultCountry="us"
                      value={values.phone_number}
                      onChange={(value: string) => {
                        setPhoneNum(value);
                        handleInputChange({
                          target: {
                            name: "phone_number",
                            value: value,
                          },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                      required
                      variant="outlined"
                      margin="normal"
                    />
                    {touched.phone_number && errors.phone_number && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.phone_number}
                      </HelperText>
                    )}
                  </StyledFormControl>
                </Box>
                <Box sx={{ marginTop: "40px", width: "368px" }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    align="left"
                    sx={{
                      alignSelf: "flex-start",
                      color: "text.primary",
                      mb: 2,
                    }}
                  >
                    Address
                  </Typography>

                  <StyledFormControl>
                    <Label>Lived in Country / Region*</Label>
                    <Select
                      options={countryOptions}
                      menuPlacement="auto"
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.isoCode}
                      value={selectedlived_in_country}
                      onChange={handlelived_in_countryChange}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: `${isSmallScreen ? "358px" : "368px"}`,
                          boxShadow: "none",
                          backgroundColor: "#525252", // Set the background color of the control
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#00000066"
                              : "#00000066",
                          },
                          color: "#fff",
                          borderColor: `${
                            state.isFocused ? "#00000066" : "#00000066"
                          }`,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Set the background color of the dropdown menu
                          border: "1px solid #00000066", // Add border to the dropdown menu
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow to the dropdown menu
                          zIndex: 10, // Ensure the menu appears above other elements
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Ensure the menu list also has the same background color
                          padding: 0,
                          // Optionally hide scrollbar
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#525252"
                            : "#525252", // Selected option background color
                          color: state.isSelected ? "#fff" : "#fff", // Option text color
                          "&:hover": {
                            backgroundColor: state.isSelected
                              ? "#525252"
                              : "#555", // Hover background color
                            color: "#fff",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#FFF", // Change dropdown icon color
                        }),
                        indicatorSeparator: () => ({
                          // Remove indicator separator
                          display: "none",
                        }),
                      }}
                    />
                    {touched.lived_in_country && errors.lived_in_country && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.lived_in_country}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Worked in Country / Region*</Label>
                    <Select
                      options={countryOptions}
                      menuPlacement="auto"
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.isoCode}
                      value={selectedWorkedInCountry}
                      onChange={handleWorkedInCountryChange}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: `${isSmallScreen ? "358px" : "368px"}`,
                          boxShadow: "none",
                          backgroundColor: "#525252", // Set the background color of the control
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#00000066"
                              : "#00000066",
                          },
                          color: "#fff",
                          borderColor: `${
                            state.isFocused ? "#00000066" : "#00000066"
                          }`,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Set the background color of the dropdown menu
                          border: "1px solid #00000066", // Add border to the dropdown menu
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow to the dropdown menu
                          zIndex: 10, // Ensure the menu appears above other elements
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Ensure the menu list also has the same background color
                          padding: 0,
                          // Optionally hide scrollbar
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#525252"
                            : "#525252", // Selected option background color
                          color: state.isSelected ? "#fff" : "#fff", // Option text color
                          "&:hover": {
                            backgroundColor: state.isSelected
                              ? "#525252"
                              : "#555", // Hover background color
                            color: "#fff",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#FFF", // Change dropdown icon color
                        }),
                        indicatorSeparator: () => ({
                          // Remove indicator separator
                          display: "none",
                        }),
                      }}
                    />
                    {touched.worked_in_country && errors.worked_in_country && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.worked_in_country}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Address line 1*</Label>
                    <StyledInput
                      name="address_line1"
                      placeholder="Eg: 177 Bleecker St"
                      value={values.address_line1}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.address_line1 && errors.address_line1 && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.address_line1}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Address line 2</Label>
                    <StyledInput
                      name="address_line2"
                      placeholder="Eg: Apartment no"
                      value={values.address_line2}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {touched.address_line2 && errors.address_line2 && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.address_line2}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>State*</Label>
                    <Select
                      options={stateOptions}
                      menuPlacement="auto"
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.isoCode}
                      value={selectedState}
                      onChange={(item) => {
                        setSelectedState(item);
                        setSelectedCity(null);
                        setFieldValue("state", item?.isoCode || "");
                        validateForm();
                      }}
                      isDisabled={!selectedlived_in_country}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: `${isSmallScreen ? "358px" : "368px"}`,
                          boxShadow: "none",
                          backgroundColor: "#525252", // Set the background color of the control
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#00000066"
                              : "#00000066",
                          },
                          color: "#fff",
                          borderColor: `${
                            state.isFocused ? "#00000066" : "#00000066"
                          }`,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Set the background color of the dropdown menu
                          border: "1px solid #00000066", // Add border to the dropdown menu
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow to the dropdown menu
                          zIndex: 10, // Ensure the menu appears above other elements
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Ensure the menu list also has the same background color
                          padding: 0,
                          // Optionally hide scrollbar
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#525252"
                            : "#525252", // Selected option background color
                          color: state.isSelected ? "#fff" : "#fff", // Option text color
                          "&:hover": {
                            backgroundColor: state.isSelected
                              ? "#525252"
                              : "#555", // Hover background color
                            color: "#fff",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#FFF", // Change dropdown icon color
                        }),
                        indicatorSeparator: () => ({
                          // Remove indicator separator
                          display: "none",
                        }),
                      }}
                    />
                    {touched.state && errors.state && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.state}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>City*</Label>
                    <Select
                      options={cityOptions}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      menuPlacement="auto"
                      value={selectedCity}
                      onChange={(item) => {
                        setSelectedCity(item);
                        setFieldValue("city", item?.name || "");
                        validateForm();
                      }}
                      isDisabled={!selectedState}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          width: `${isSmallScreen ? "358px" : "368px"}`,
                          boxShadow: "none",
                          backgroundColor: "#525252", // Set the background color of the control
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#00000066"
                              : "#00000066",
                          },
                          color: "#fff",
                          borderColor: `${
                            state.isFocused ? "#00000066" : "#00000066"
                          }`,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Set the background color of the dropdown menu
                          border: "1px solid #00000066", // Add border to the dropdown menu
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow to the dropdown menu
                          zIndex: 10, // Ensure the menu appears above other elements
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          backgroundColor: "#525252", // Ensure the menu list also has the same background color
                          padding: 0,
                          // Optionally hide scrollbar
                          "&::-webkit-scrollbar": {
                            display: "none",
                          },
                          msOverflowStyle: "none", // IE and Edge
                          scrollbarWidth: "none", // Firefox
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#525252"
                            : "#525252", // Selected option background color
                          color: state.isSelected ? "#fff" : "#fff", // Option text color
                          "&:hover": {
                            backgroundColor: state.isSelected
                              ? "#525252"
                              : "#555", // Hover background color
                            color: "#fff",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#FFF",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#FFF", // Change dropdown icon color
                        }),
                        indicatorSeparator: () => ({
                          // Remove indicator separator
                          display: "none",
                        }),
                      }}
                    />
                    {touched.city && errors.city && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.city}
                      </HelperText>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <Label>Zip code*</Label>
                    <Field
                      name="zip_code"
                      as={StyledInput}
                      placeholder="Enter zip code"
                      onChange={handleInputChange}
                    />
                    {touched.zip_code && errors.zip_code && (
                      <HelperText sx={{ mt: 1, mb: 0, color: "red" }}>
                        {errors.zip_code}
                      </HelperText>
                    )}
                  </StyledFormControl>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Box>
  );
};
export default VerifyForm;
