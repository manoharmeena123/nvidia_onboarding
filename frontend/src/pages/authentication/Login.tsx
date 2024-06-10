import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Vector from "@assets/components/Vector";
import { Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import googleImage from "@assets/google.png";
// import Google from "@assets/components/Google";

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log({
    VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
  });

  const handleGoogleSignIn = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/login"; // Redirect to NestJS Google Auth endpoint
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {!isSmallScreen && (
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundColor: "#020617",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton sx={{ width: "100%", padding: 0 }}>
              <Vector />
            </IconButton>
          </Box>
        </Grid>
      )}
      <Grid item xs={12} sm={6} sx={{ bgcolor: "#525252" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "16px",
          }}
        >
          <Box sx={(theme) => ({ padding: theme.spacing(3) })}>
            <Typography
              variant="h5"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                textAlign: "center",
                mb: theme.spacing(2),
              })}
            >
              Alignerr
            </Typography>
            <Typography
              variant="body1"
              sx={(theme) => ({
                colors: theme.palette.text.secondary,
                textAlign: "center",
              })}
            >
              Get paid to train groundbreaking AI models on your own time
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={(theme) => ({
              border: `1px solid #00000066 `,
              cursor: `pointer`,
              borderRadius: theme.spacing(0.5),

              padding: theme.spacing(1.5, 3, 1.5, 3),
              marginTop: theme.spacing(3),
            })}
            onClick={handleGoogleSignIn}
          >
            <Avatar
              sx={{ height: 32, width: 32 }}
              alt="google logo"
              src={googleImage}
            />

            <Box sx={{ padding: 0 }}>
              <Typography
                variant="body1"
                sx={(theme) => ({
                  color: theme.palette.text.primary,
                  textTransform: "none",
                })}
              >
                Continue with Google
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
