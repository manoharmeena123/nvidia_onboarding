import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import { VideoPlayer } from "@components/common/index";

// Define a type for the style object
type StyleType = {
  fontWeight: string;
  fontSize: string;
  color: string;
  lineHeight: string;
};

const listitemStyle: StyleType = {
  fontWeight: "400",
  fontSize: "14px",
  color: "#fff",
  lineHeight: "2",
};

const FinishSetup = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#525252",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography
              fontWeight="600"
              fontSize="24px"
              variant="h4"
              color="#fff"
            >
              You’re all set
            </Typography>
            <Typography
              fontWeight="400"
              fontSize="16px"
              variant="body1"
              color="#fff"
            >
              We’ll review your application to be an Alignerr labeler and get
              back to you in 3-5 business days (This is temp text).
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography
              fontWeight="600"
              fontSize="24px"
              variant="h4"
              color="#fff"
            >
              In the meanwhile
            </Typography>
            <Typography
              fontWeight="400"
              fontSize="16px"
              variant="body1"
              color="#fff"
            >
              Learn more about how we work and what you can expect next
            </Typography>
          </Stack>
          <VideoPlayer />
          <Stack spacing={1} sx={{ mt: 4, ml: { xs: 0, md: "-30px" } }}>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={listitemStyle}>
                This is some text and then a link to go somewhere
              </li>
              <li style={listitemStyle}>This is some text</li>
              <li style={listitemStyle}>This is some text</li>
            </ul>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default FinishSetup;
