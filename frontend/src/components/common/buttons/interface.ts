import { ReactNode } from "react";
export interface BackArrowButtonProps {
  buttonProps: {
    backButtonText: string;
    steps: string[];
  };
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface ForwardArrowButtonProps {
  buttonProps: {
    nextButtonText: string;
    steps: string[];
  };
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface AddFieldButtonProps {
  label: string; // Required string for the button label
  icon?: ReactNode; // Optional icon element
  onClick?: () => void; // Optional click handler function
}
