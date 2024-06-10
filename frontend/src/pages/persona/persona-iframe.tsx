import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import InlineInquiry from "@services/persona/inlineInquery";
import { verifyPersona } from "@services/api/auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoadingComponent } from "@components/common";

const PersonaVerification = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    console.log("Persona module has loaded");
  };

  const handleReady = () => {
    console.log("Persona inquiry is ready for interaction");
    setIsLoaded(true);
  };

  type Field = any;

  const handleComplete = async ({
    inquiryId,
    status,
    fields,
  }: {
    inquiryId: string;
    status: string;
    fields: Record<string, string> | Record<string, Field>;
  }) => {
    try {
      await verifyPersona({ inquiryId, status, fields });
      console.log("InquiryId successfully sent to backend");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending inquiryId to backend:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleError = (error: any) => {
    console.error(`Persona error: ${error.message}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#525252",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <Box sx={{ width: "100%" }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#404040",
          margin: "8px",
          width: isSmallScreen ? "90%" : isMediumScreen ? "90%" : "40%",
          borderRadius: "8px",
          mt: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "100%",
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          {!isLoaded && <LoadingComponent />}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: isLoaded ? "block" : "none",
            }}
          >
            <InlineInquiry
              onLoad={handleLoad}
              onReady={handleReady}
              onComplete={handleComplete}
              onError={handleError}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default PersonaVerification;
