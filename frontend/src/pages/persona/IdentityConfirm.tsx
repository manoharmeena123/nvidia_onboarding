import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import Confirm from "@assets/components/Confirm";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

const PersonaVerificationConfirm = () => {
  const navigate = useNavigate();
  const { setIsFormValid } = useAppStore();
  useEffect(() => {
    setIsFormValid(true);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "bodyColor.main",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
      }}
    >
      <Container maxWidth="md">
        <Stack direction="column" spacing={2} alignItems="center">
          <Stack alignItems="flex-start" sx={{ width: "100%" }}>
            <Confirm />
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            alignItems="flex-start"
            sx={{ width: "100%" }}
          >
            <Typography
              fontWeight="600"
              fontSize={{ xs: "20px", md: "24px" }}
              variant="h3"
              color="text.primary"
              lineHeight={2}
            >
              Identity verified
            </Typography>
            <Typography
              fontWeight="400"
              fontSize={{ xs: "14px", md: "16px" }}
              variant="h5"
              color="text.primary"
              lineHeight={2}
            >
              Thank you for verifying your identity. You may now proceed with
              your account setup.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default PersonaVerificationConfirm;
