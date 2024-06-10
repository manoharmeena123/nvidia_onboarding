import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const OTPInput: React.FC<{
  otp: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
}> = ({ otp, handleChange, handlePaste, handleKeyDown }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant="body1" component="label" htmlFor="otp-input-0">
        One Time Password*
      </Typography>
      <Box display="flex" gap={2} mt={1}>
        {otp.map((value, index) => (
          <TextField
            key={index}
            id={`otp-input-${index}`}
            value={value}
            onChange={(e: any) => handleChange(e, index)}
            onPaste={handlePaste}
            onKeyDown={(e: any) => handleKeyDown(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center", color: "#FFFFFF" },
            }}
            sx={{
              width: "2.5rem",
              height: "40px",
              "& .MuiInputBase-input": { color: "#FFFFFF" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#93C5FD", // hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF", // focus border color
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
