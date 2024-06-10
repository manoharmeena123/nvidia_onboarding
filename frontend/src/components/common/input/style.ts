// src/components/styles/FormControlStyles.ts
import { styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Input, inputClasses } from "@mui/base/Input";
import Select from "@mui/material/Select";
import { grey } from "../../../utils/constant";
import { FormControl } from "@mui/material";
import MuiPhoneNumber from "mui-phone-number";
import { BorderColor, Padding } from "@mui/icons-material";

export const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: ${useMediaQuery(theme.breakpoints.down("sm")) ? "358px" : "368px"};
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    color: ${theme.palette.mode === "dark" ? grey[300] : "#FFFFFF"};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#525252"};
    border: 1px solid ${
      theme.palette.mode === "dark" ? grey[700] : "#00000066"
    };
  }
`
);

export const Label = styled("label")<{ className?: string }>(
  ({ className }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 0px;
  margin-top: 0px;
  color: #E5E5E5;
  &.invalid {
    color: red;
  }
  return <p className={className}></p>;
`
);

export const HelperText = styled("p")<{ className?: string }>(
  ({ className }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  color: #F87171;
  return <p className={className}>This field is required.</p>;
`
);

export const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginTop: "5px",
});

export const StyledMuiPhoneNumber = styled(MuiPhoneNumber)({
  marginTop: "5px",
  width: "100%",
  "& .MuiInputBase-root": {
    color: "#FFFFFF", // Example: change text color
    backgroundColor: "#525252", // Example: change background color
    alignItems: "center",
    gap: "4px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00000066", // Example: change border color
    },
    "&:hover fieldset": {
      borderColor: "#000000", // Example: change border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Example: change border color when focused
    },
  },
  "& .MuiInputBase-input": {
    padding: "8px 10px", // Correct padding property
  },
  "& .ehftlE": {
    padding: "8px 10px !important", // Override padding with !important
    paddingLeft: "0 !important", // Override padding-left with !important
  },
});
export const StyledSelect = styled(Select)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  height: 40px;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 4px;
  color: #ffffff;
  background: #525252;
  border: 1px solid #00000066;

  /* Additional styles can be added here */
`;
