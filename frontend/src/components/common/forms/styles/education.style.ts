import { styled } from "@mui/system";
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  useMediaQuery,
} from "@mui/material";
import { inputClasses } from "@mui/material/Input";
import { grey } from "@utils/constant"; // Ensure this path is correct for your constants

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

export const StyledSelectFormControl = styled(FormControl)(({ theme }) => ({
  width: "200px",
  [theme.breakpoints.down("sm")]: {
    width: "200px",
  },
}));

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
export const StyledSelect = styled(Select)(
  ({ theme }) => `
  .MuiSelect-select {
    width: 100%;
    font-size: 16px;
    padding: 7px 14px;
    color: theme.palette.text.primary;
    ${inputBorderStyle}
  }
  .MuiSelect-icon {
    color: #ffffff; // Color for the select icon
  }
  .MuiPaper-root {
    max-height: 200px; // Set the maximum height of the dropdown menu
    background-color: #444444; // Set the background color of the dropdown menu
  }
  .MuiList-root {
    background-color: #444444; // Set the background color of the dropdown menu items
  }
`
);
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

export const HelperText = styled("div")`
  font-size: 0.875rem;
  color: #f87171;
  margin: 4px 0 0 0;
`;
export const CustomInputLabel = styled(InputLabel)`
  &::after {
    content: "*";
    color: #f87171;
    margin-left: 2px; /* Adjust spacing as needed */
  }
`;
