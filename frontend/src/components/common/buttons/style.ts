import { SxProps, Theme } from "@mui/system";

export const backButtonStyle: SxProps<Theme> = {
  visibility: "visible", // This will be overridden as needed in the component logic
  border: "none",
  backgroundColor: "#93C5FD",
  color: "#000",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  height: "100%",
  padding: "8px 16px",
  lineHeight: "24px",
  letterSpacing: "0.52px",
  transition: "none", // Disable transitions
  "&:hover": {
    backgroundColor: "#93C5FD", // Same as default
    color: "#000", // Same as default
    transition: "none ", // Disable transitions on hover
    "& .MuiButton-startIcon": {
      color: "#000", // Same as default
    },
  },
};

export const buttonStyle: SxProps<Theme> = {
  backgroundColor: "#93C5FD",
  color: "#000",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  height: "100%",
  padding: "8px 16px",
  lineHeight: "24px",
  letterSpacing: "0.52px",
  "&:hover": {
    backgroundColor: "#93C5FD",
    "& .MuiButton-endIcon": {
      color: "#FFF",
    },
  },
  "&.Mui-disabled": {
    backgroundColor: "#FFFFFF1F",
    color: "#FFFFFF4D;", 
     "& .MuiButton-endIcon": {
       color:"#FFFFFF4D", // Change the color of the end icon when disabled
    },
  },
};

export const addButtonStyle: SxProps = {
  display: "inline-flex",
  padding: "4px 10px 4px 10px",
  alignItems: "center",
  gap: "6px",
  color: "#93C5FD",
  border: "1px solid #93C5FD",
  textTransform: "none",
  marginTop: "7px"
};
