// SocialLinksForm.styles.js
import { styled } from "@mui/system";
import { Input, FormControl, useMediaQuery } from "@mui/material";
import { inputClasses } from "@mui/base/Input";
import { grey } from "../../../../utils/constant";

const inputBorderStyle = `
  border: 1px solid #000;
  border-radius: 4px;
`;

export const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: ${theme.breakpoints.down("sm") ? "358px" : "368px"};
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    color: #fff; // Text color white
    background: ${theme.palette.mode === "dark" ? grey[900] : "#525252"};

  }

  & .${inputClasses.root} {
    border: 1px solid #000; // Apply border to input container as well
    border-radius: 4px;
    color: ${theme.palette.text.primary}// Ensure the text color remains white
  }
`
);

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "368px",
  [theme.breakpoints.down("sm")]: {
    width: "358px",
  },
}));

export const Label = styled("label")`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;
  color: #fff;
`;

export const HelperText = styled("p")`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  color: red;
  margin-top: 4px;
`;
