// Header.tsx
import { useState } from "react";
import {
  ForwardArrowButton,
  BackArrowButton,
  HorizontalStepper,
} from "@components/common";
import { steps } from "@utils/constant";
import { ButtonProps } from "./stepper.type";
import { StyledHeaderStack } from "./stepper.style";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

export const StepperComponent = () => {
  const { currentStep: newSteps } = useAppStore();
  const [currentStep, setCurrentStep] = useState<number>(newSteps);
  const [buttonProps] = useState<ButtonProps>({
    backButtonText: "Back",
    nextButtonText: "Next",
    steps: steps,
  });

  return (
    <StyledHeaderStack>
      <BackArrowButton
        buttonProps={buttonProps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <HorizontalStepper activeStep={currentStep} />
      <ForwardArrowButton
        buttonProps={buttonProps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </StyledHeaderStack>
  );
};

export default StepperComponent;
