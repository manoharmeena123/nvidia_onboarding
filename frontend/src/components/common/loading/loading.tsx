import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { PageNotFound } from "../../../Not-found";

export const LoadingComponent = () => {
  const [state, setState] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setState(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (state) {
    return (
      <PageNotFound message={"Something went wrong! please try again"} mode />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        zIndex: "999",
        background: "rgba(0, 0, 0)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
