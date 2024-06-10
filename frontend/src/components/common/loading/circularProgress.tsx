import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner = ({ size, color }: SpinnerProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={size} sx={{ color }} />
    </Box>
  );
};
