import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Notfound from "@assets/components/404notfound"
import { useNavigate } from "react-router";

export const PageNotFound = (
  props: { message: string; mode: boolean } = {
    message: "This page could not be found",
    mode: false,
  }
) => {
  const refreshPage = () => {
    window.location.href = "/";
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#525252",
        minWidth: "100vw",
        position: "fixed",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={2}
        >
          <Notfound style={{ maxWidth: "100%", height: "450", marginTop: "1" }} />
          <Stack
            direction="column"
            spacing={2}
            justifyContent=""
          >
            <Typography variant="h4" color="initial">Oops! Page Not Found</Typography>
            <Typography variant="subtitle1" color="initial">We can't seem to find the page you're looking for.</Typography>
            <Typography variant="body1" color="initial">It might have been moved or deleted, or perhaps the URL is incorrect. </Typography>
            <Typography
          variant="h3"
          sx={{ marginTop: "20px", color: "black", fontSize: "25px" }}
        >
          {props.message}
        </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-evenly"
              
            >
               {props.mode && (
              <Button
                variant="contained"
                onClick={() => refreshPage()}
                sx={{ marginTop: "20px" }}
              >
                Refresh
              </Button>
               )} 
              <Button
                variant="contained"
                onClick={() => navigate('/verify-form')}
                sx={{ marginTop: "20px" }}
              >
                Home
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};
