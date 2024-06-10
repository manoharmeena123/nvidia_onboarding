import { styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Input, inputClasses } from "@mui/base/Input";
import { grey } from "@utils/constant";
import { FormControl } from "@mui/material";
import MuiPhoneNumber from "mui-phone-number";

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
    &:disabled {
      background: #FFFFFF1A; 
      color: #FFFFFF4D;     
    }
  }
`
);

interface LabelProps {
  required?: boolean;
}

export const Label = styled("label")<LabelProps>`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 0px;
  margin-top: 0px;
  color: #E5E5E5;
  ${({ required }) =>
    required &&
    `
    &:after {
      content: '*';
      color: red;
      margin-left: 4px;
    }
  `}
`;

export const HelperText = styled("p")<{ className?: string }>(
  ({ className }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-top:"5px !important";
  margin-bottom:"5px !important";
  color: #F87171;
  return <p className={className}>This field is required.</p>;
`
);

export const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginTop: '16px',

});

export const StyledMuiPhoneNumber = styled(MuiPhoneNumber)(({ theme }) => ({
  marginTop: "5px",
  width: "100%",
  "& .MuiInputBase-root": {
    color: "text.primary", // Example: change text color
    backgroundColor: "#525252", // Example: change background color
    alignItems: "center",
    gap: "4px",
    "& input": {
      '&:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px #525252 inset !important',  // Ensure autofill background color remains consistent
        '-webkit-text-fill-color': '#FFFFFF !important'
      }
    },
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

  // Responsive width
  [theme.breakpoints.down('sm')]: {
    width: '358px',
  },
  [theme.breakpoints.up('md')]: {
    width: '368px',
  },
}));