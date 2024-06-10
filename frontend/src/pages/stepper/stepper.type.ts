export interface ButtonProps {
  backButtonText: string;
  nextButtonText: string;
  steps: string[];
}

export interface ArrowButtonProps {
  buttonProps: ButtonProps;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
