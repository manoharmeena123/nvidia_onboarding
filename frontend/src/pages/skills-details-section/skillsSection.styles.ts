import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

export const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "auto", // width for screen size 'sm' and up
  },

  [theme.breakpoints.down("sm")]: {
    width: "390px", // width for screen size below 'sm'
  },

  backgroundColor: "#525252",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: theme.spacing(5),
  color: theme.palette.text.primary,
}));

export const StyledContainer = styled(Container)({
  padding: "0px 16px 0px  16px",

  marginLeft: "16px",
  marginRight: "16px",
  height: "auto",
});
