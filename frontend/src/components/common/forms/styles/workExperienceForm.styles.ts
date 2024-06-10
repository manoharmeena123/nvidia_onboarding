import { styled } from "@mui/system";
import { Input, FormControl, FormControlLabel } from "@mui/material";
import { inputClasses } from "@mui/material/Input";
import { grey } from "../../../../utils/constant";

const inputBorderStyle = `
  border: 1px solid #00000066;
  border-radius: 4px;
`;

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "368px",
  [theme.breakpoints.down("sm")]: {
    width: "358px",
  },
}));
export const StyledFormDateControl = styled(FormControl)(({ theme }) => ({
  width: "200px",
  [theme.breakpoints.down("sm")]: {
    width: "200px",
  },
  "& .MuiSvgIcon-root": {
    color: "#FFFFFF",
  },
}));

export const StyledInput = styled(Input)(
  ({ theme }) => `
  .${inputClasses.input} {
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : "#FFFFFF"};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#525252"};
    ${inputBorderStyle}
  }
`
);

export const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    color: #fff;
    margin-right: 0;
    font-weight: 400;
    align-items: self-end;
    line-height: 2.5;
  }
  && .MuiCheckbox-root {
    color: #fff;
  }
  && .Mui-checked {
    color: #fff;
  }
  && .MuiFormControlLabel-label {
    line-height: 2.5;
    ,
    .MuiTypography-root {
      font-size: 16px;
      color: #f87171;
      line-height: 2.5;
    }
  }
`;

export const Label = styled("label")<{ required?: boolean }>`
  display: block;
  margin-bottom: 8px;
  color: theme.palette.text.secondary;
  font-size: 16px;
  font-family: "IBM Plex Sans", sans-serif;
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

export const HelperText = styled("p")`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  color: red;
`;
