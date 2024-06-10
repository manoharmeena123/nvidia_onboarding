import { Theme } from "@mui/material/styles";

// SocialLinksForm.types.ts
export interface SocialLinksFormProps {
    // Define any props specific to your form here. For example:
    onSubmit: (link: string) => void;
  }
  
  export interface StyledComponentProps {
    theme: Theme;
  }
  