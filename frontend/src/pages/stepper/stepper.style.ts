// Header.styles.ts
import { Stack } from '@mui/material';
import { styled } from '@mui/system';

export const StyledHeaderStack = styled(Stack)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  flexDirection: 'row',
  justifyContent: 'space-between',
  spacing:'24px',
  width: '100%',
  backgroundColor: "#404040",
  padding:"12px 24px"
}));
