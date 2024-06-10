// src/components/styles/HorizontalStepperStyles.ts
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';

export const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

export const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.30)',
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: '#93C5FD', // Active step color
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: 'rgba(255, 255, 255, 0.30)', // Completed step color
  },
  '& .MuiStepIcon-root': {
    '& circle': {
      fill: 'rgba(255, 255, 255, 0.30)', // Change the fill color of the circle
    },
    '& .MuiStepIcon-text': {
      fill: '#000', // Change the color of the step number text
    }
  },    
}));
