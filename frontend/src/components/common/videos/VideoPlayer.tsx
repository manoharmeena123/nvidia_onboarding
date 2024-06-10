import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button, Box } from "@mui/material";

export const VideoPlayer: React.FC = () => {
  // State with explicit boolean type annotation
  const [fitToWindow, setFitToWindow] = useState<boolean>(false);

  const handleResize = () => {
    setFitToWindow(!fitToWindow);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: fitToWindow ? "90vh" : "auto",
        width: fitToWindow ? "100vw" : "100%",
        position: "relative",
        overflow: "hidden",
        bgcolor: "black",
        padding: fitToWindow ? 0 : "16px",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          position: fitToWindow ? "fixed" : "relative",
          top: fitToWindow ? 0 : "auto",
          left: fitToWindow ? 0 : "auto",
          width: fitToWindow ? "100%" : "640px",
          height: fitToWindow ? "100%" : "360px",
          maxHeight: "100vh",
          zIndex: 10,
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          loop={true}
          volume={0.8}
        />
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleResize}
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 20,
          }}
        >
          {fitToWindow ? "Normal Size" : "Fit to Window"}
        </Button> */}
      </Box>
    </Box>
  );
};
