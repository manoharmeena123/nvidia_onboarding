// WorkExperienceForm.types.ts
export interface FormControlContextType {
    filled?: boolean;
    required?: boolean;
    error?: boolean;
  }
  
  export interface StyledInputProps {
    theme: {
      palette: {
          mode: 'dark' | 'light';
      };
    };
  }
  