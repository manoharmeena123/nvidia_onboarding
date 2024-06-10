// src/components/styles/CheckboxesGroupStyles.ts
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

export const WhiteFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: '#fff', // Assuming you are using a dark theme and want white text
  },
}));
