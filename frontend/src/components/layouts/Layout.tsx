import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import StepperComponent from "@pages/stepper/Stepper";
import { Grid } from "@mui/material";

// Define interface for Layout's props
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const noHeaderRoutes: string[] = ["/login", "/", "*"]; // Include wildcard route for 404
  const noFounfPAge: string[] = ["*"]; // Include wildcard route for 404

  // Log the current location pathname for debugging
  // console.log("Current Pathname:", location.pathname);

  // Check if the current route is in the noHeaderRoutes array
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  // Check if the current route is in the noHeaderRoutes array
  const notFound = !noHeaderRoutes.includes(location.pathname);

  // Log the result of the showHeader check
  // console.log("Show Header:", showHeader, notFound);

  return (
    <Grid>
      {notFound && showHeader && <StepperComponent />}
      <Grid
        sx={{
          backgroundColor: "#525252",
          color: "#fff",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};
