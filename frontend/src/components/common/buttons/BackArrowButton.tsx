import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackArrowButtonProps } from "./interface";
import { backButtonStyle } from "./style";
import LeftArrow from "@assets/components/LeftArrow";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

export const BackArrowButton = ({
  buttonProps,
  currentStep,
  setCurrentStep,
}: BackArrowButtonProps) => {
  const { setIsFormValid } = useAppStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBack = () => {
    navigate(buttonProps.steps[0]);
    setCurrentStep(0); // Explicitly typing prevState
    setIsFormValid(false);
  };

  return (
    <Button
      variant="outlined"
      startIcon={!isSmallScreen && <LeftArrow />}
      onClick={handleBack}
      sx={{
        ...backButtonStyle,
        padding: isSmallScreen ? "4px 8px" : "8px 16px",
        visibility: currentStep === 0 ? "hidden" : "visible",
      }}
    >
      {buttonProps.backButtonText}
    </Button>
  );
};
