import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const IdentityVerification = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/persona-verification");
  };
  return (
    <Box
      sx={{
        color: "#fff",
        height: "100vh",
        paddingTop: theme.spacing(5),
      }}
    >
      <Container>
        <Stack
          direction="column"
          spacing={isSmallScreen ? theme.spacing(3) : theme.spacing(4)}
        >
          <Stack
            direction="column"
            sx={{
              marginTop: theme.spacing(5),
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: isSmallScreen ? "18px" : "20px",
                color: "#fff",
                lineHeight: 2,
              }}
            >
              Verify your identity
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                fontSize: isSmallScreen ? "12px" : "14px",
                color: "#fff",
                lineHeight: 2,
              }}
            >
              We need to make sure you are who you say you are. Begin your
              identity verification by clicking below.
            </Typography>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              sx={{
                width: "206px",
                display: "inline-flex",
                height: "40px",
                fontSize: "14px",
                color: "#000",
                backgroundColor: "#93C5FD",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#93C5FD",
                },
              }}
              onClick={handleButtonClick}
            >
              <Typography
                fontSize={13}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={1.5}
                textTransform={"none"}
                color={"#000"}
                flexDirection={"row"}
                letterSpacing={"0.52px"}
                sx={{
                  whiteSpace: "nowrap",
                  padding: "8px 12px",
                }}
              >
                Start identity verification
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default IdentityVerification;
