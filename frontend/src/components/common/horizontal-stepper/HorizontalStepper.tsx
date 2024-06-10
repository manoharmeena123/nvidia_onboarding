import { Box, Stepper, Step, Typography, useMediaQuery, useTheme } from "@mui/material";
import { stepsList } from "../../../utils/constant";
import { HorizontalStepperProps } from "./interface";
import { CustomConnector, StepLabelStyle } from "./style";

export const HorizontalStepper = ({ activeStep }: HorizontalStepperProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ width: isSmallScreen ? "100%" : (isMediumScreen ? "90%" : "80%"), alignItems: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", color: "#fff", mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={600} fontSize={'14px'}>
          Account set up ({activeStep + 1}/{stepsList.length})
        </Typography>
      </Box>
      <Stepper
        activeStep={activeStep}
        connector={<CustomConnector />}
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: isSmallScreen ? "center" : "space-between",
          alignItems: isSmallScreen ? "center" : "center",
          width: isSmallScreen ? "100%" : (isMediumScreen ? "90%" : "100%"),
          maxWidth:"1174px",
          margin: "auto"
        }}
      >
        {stepsList.map((label, index) => (
          <Step
            key={label}
            completed={activeStep > index}
            sx={{ display: isSmallScreen && activeStep !== index ? 'none' : 'flex' }}
          >
            <StepLabelStyle>{label}</StepLabelStyle>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
