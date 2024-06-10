import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";

const PersonaVerificationConfirm = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#525252",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <Box sx={{ height: "10vh", width: "100%" }}>
        <Container>
          <Typography
            fontWeight="600"
            fontSize="20px"
            variant="h3"
            color="#fff"
            lineHeight={2}
          >
            Verify your details
          </Typography>
          <Typography
            fontWeight="400"
            fontSize="14px"
            variant="h3"
            color="#fff"
            lineHeight={2}
          >
            We need to make sure you are who you say you are. Choose a way to
            verify your identity (This is temp text).
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
export default PersonaVerificationConfirm;
