import React, { useEffect, useState } from "react";
import { StyledInput, Label, HelperText, StyledFormControl } from "./style";
import { Country, State, City } from "country-state-city";
import Select, { SingleValue } from "react-select";
import { CountryOption, StateOption, CityOption } from "./interface";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { createChangeEvent } from "@utils/createChangeEvent"; // Adjust the path to where your utility function is located

interface AddressFormFieldProps {
  values: {
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
  };
  errors: FormikErrors<{
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
  }>;
  touched: FormikTouched<{
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
  }>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
}

export const AddressFormField: React.FC<AddressFormFieldProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedCountry, setSelectedCountry] = useState<SingleValue<CountryOption>>(null);
  const [selectedState, setSelectedState] = useState<SingleValue<StateOption>>(null);
  const [selectedCity, setSelectedCity] = useState<SingleValue<CityOption>>(null);

  useEffect(() => {
    if (selectedCountry) {
      console.log(selectedCountry);
      console.log(selectedCountry?.isoCode);
      console.log(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  }, [selectedCountry]);

  return (
    <>
      <StyledFormControl>
        <Label>Country / region</Label>
        <Select
          options={Country.getAllCountries()}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.isoCode}
          value={selectedCountry}
          onChange={(item) => {
            setSelectedCountry(item);
            setSelectedState(null);
            setSelectedCity(null);
            handleChange(createChangeEvent("country", item?.isoCode || ""));
          }}
          styles={{
            control: (provided, state) => ({
              ...provided,
              width: ` ${isSmallScreen ? "358px" : "368px"}`,
              boxShadow: "none",
              backgroundColor: "#525252",
              "&:hover": {
                borderColor: state.isFocused ? "#00000066" : "#00000066",
              },
              color: "#fff",
              borderColor: `${state.isFocused ? "#00000066" : "#00000066"}`,
            }),
            option: (provided) => ({
              ...provided,
              color: "#000",
            }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
        {touched.country && errors.country && <HelperText>{errors.country}</HelperText>}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Address line 1*</Label>
        <StyledInput
          name="addressLine1"
          placeholder="Eg: 177 Bleecker St"
          value={values.addressLine1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.addressLine1 && errors.addressLine1 && <HelperText>{errors.addressLine1}</HelperText>}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Address line 2*</Label>
        <StyledInput
          name="addressLine2"
          placeholder="Eg: Apartment no"
          value={values.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <HelperText>{errors.addressLine2}</HelperText>
      </StyledFormControl>
      <StyledFormControl>
        <Label>State*</Label>
        <Select
          options={State.getStatesOfCountry(selectedCountry?.isoCode || "")}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.isoCode}
          value={selectedState}
          onChange={(item) => {
            setSelectedState(item);
            setSelectedCity(null);
            handleChange(createChangeEvent("state", item?.isoCode || ""));
          }}
          isDisabled={!selectedCountry}
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: "none",
              width: ` ${isSmallScreen ? "358px" : "368px"}`,
              backgroundColor: "#525252",
              borderColor: "#00000066",
              color: "#fff",
              "&:hover": {
                borderColor: state.isFocused ? "#00000066" : "#00000066",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
        {touched.state && errors.state && <HelperText>{errors.state}</HelperText>}
      </StyledFormControl>
      <StyledFormControl>
        <Label>City*</Label>
        <Select
          options={City.getCitiesOfState(selectedState?.countryCode || "", selectedState?.isoCode || "")}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={selectedCity}
          onChange={(item) => {
            setSelectedCity(item);
            handleChange(createChangeEvent("city", item?.name || ""));
          }}
          isDisabled={!selectedState}
          styles={{
            control: (provided, state) => ({
              ...provided,
              width: ` ${isSmallScreen ? "358px" : "368px"}`,
              backgroundColor: "#525252",
              borderColor: "#00000066",
              boxShadow: "none",
              color: "#fff",
              "&:hover": {
                borderColor: state.isFocused ? "#00000066" : "#00000066",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
        {touched.city && errors.city && <HelperText>{errors.city}</HelperText>}
      </StyledFormControl>
      <StyledFormControl>
        <Label>Zip code*</Label>
        <StyledInput
          name="zipCode"
          placeholder="Enter zip code"
          value={values.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.zipCode && errors.zipCode && <HelperText>{errors.zipCode}</HelperText>}
      </StyledFormControl>
    </>
  );
};
