// // StyledComponents.ts
// import { Divider, DividerProps } from "@mui/material";
// import styled from "styled-components";

// export const StyledDividerSmall = styled(Divider)(({ theme }) => ({
//   display: "flex",
//   width: "358px",
//   justifyContent: "center",
//   alignItems: "center",
//   flexShrink: 0,
//   backgroundColor: "#000000",
//   opacity: "40%",
//   marginTop: theme.spacing(5),
//   marginBottom: theme.spacing(5),
// }));
// export const StyledDividerLarge = styled(Divider)(({ theme }) => ({
//   display: "flex",
//   width: "960px",
//   justifyContent: "center",
//   alignItems: "center",
//   flexShrink: 0,
//   backgroundColor: "#000000",
//   opacity: "40%",
//   marginTop: theme.spacing(5),
//   marginBottom: theme.spacing(5),
// }));

// StyledComponents.ts
import { Divider, DividerProps } from "@mui/material";
import styled from "styled-components";

interface CustomDividerProps extends DividerProps {
  width?: string;
  color?: string;
  height?: string;
}

export const CustomDivider = styled(Divider)<CustomDividerProps>(
  ({ theme, width, height }) => ({
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "358px",
    },
    height: height || "1px",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    alignSelf: "center",

    backgroundColor: "#00000066",
    marginTop: "40px !important",
    marginBottom: "40px !important",
  })
);
