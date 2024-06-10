import { styled } from '@mui/system';
import { Box, Typography, Card } from '@mui/material';

export const StyledBox = styled(Box)({
  backgroundColor: '#525252',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledContainerBox = styled(Box)({
  width: '100%',
  marginTop: '20px', // Adjusted margin for better spacing
});

export const StyledCard = styled(Card)({
  height: '300px',
  width: '50%',
  marginTop: '40px',
});

export const ListItemStyle = {
  fontWeight: '400',
  fontSize: '14px',
  variant: 'h3',
  color: '#fff',
  lineHeight: '2',
};

export const StyledTypography = styled(Typography)({
  fontWeight: 400,
  fontSize: '14px',
  color: '#fff',
  lineHeight: 2,
});

export const MainHeadingTypography = styled(Typography)({
  fontWeight: 600,
  fontSize: '20px',
  color: '#fff',
  lineHeight: 2,
});
