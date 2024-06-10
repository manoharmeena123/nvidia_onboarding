import React from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ForwardArrowButtonProps } from "./interface";
import { buttonStyle } from "./style";
import RightArrow from "@assets/components/RightArrow";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppStore } from "@zustand-store/userStore/useAppStore";
import { verifyForm } from "@services/api/auth";

export const ForwardArrowButton = ({
  buttonProps,
  currentStep,
  setCurrentStep,
}: // setCurrentStep,
ForwardArrowButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isFormValid, submitForm, setIsFormValid, formData, setFormdata } =
    useAppStore();

  const handleNext = async () => {
    let page = location.pathname.slice(1);
    const elem = page.split("-");
    page = elem[0] + elem[1].charAt(0).toUpperCase() + elem[1].slice(1);
    let nextStep = currentStep;

    switch (page) {
      case "verifyForm" || "/":
        const response = await submitForm(page);
        if (response) {
          if (formData?.user?.mobile_verified) {
            nextStep = 3;
            setCurrentStep((prevState: number) => prevState + 1);
          }
          if (formData.user.persona_verified) {
            nextStep = 4;
            setCurrentStep((prevState: number) => prevState + 1);
          }
          if (
            !formData.user.persona_verified &&
            !formData?.user?.mobile_verified
          ) {
            nextStep = 1;
            setCurrentStep((prevState: number) => prevState + 1);
          }
          navigate(buttonProps.steps[nextStep]);
        }
        break;
      case "verifyMobile":
        nextStep = 2;
        setCurrentStep((prevState: number) => prevState + 1);
        setFormdata("user", { mobile_verified: true });
        navigate(buttonProps.steps[nextStep]);
        break;
      case "identityVerification":
        nextStep = 3;
        setCurrentStep((prevState: number) => prevState + 1);
        setFormdata("user", { mobile_verified: true });
        navigate(buttonProps.steps[nextStep]);
        break;
      case "personaIframe":
        nextStep = 4;
        setCurrentStep((prevState: number) => prevState + 1);
        setFormdata("user", { persona_verified: true });
        navigate(buttonProps.steps[nextStep]);
        break;
      case "skillSection":
        // In Case all done
        // nextStep = 4;
        // setCurrentStep(4);
        // navigate(buttonProps.steps[nextStep]);
        break;
      case "identityConfirm":
        nextStep = 4;
        setCurrentStep((prevState: number) => prevState + 1);
        setFormdata("user", { persona_verified: true });
        navigate(buttonProps.steps[nextStep]);
        break;
    }
    setIsFormValid(false);

    console.log("current page", page);
  };

  return (
    <Button
      variant="contained"
      endIcon={!isSmallScreen && <RightArrow />}
      onClick={handleNext}
      sx={{
        ...buttonStyle,
        padding: isSmallScreen ? "4px 8px" : "8px 16px",
       

      }}
      disabled={!isFormValid}
    >
      {buttonProps.nextButtonText}
    </Button>
  );
};
