import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import UploadIcon from "@assets/components/UploadIcon";

const FileDetails = styled.div`
  margin-top: 16px;
`;

const UploadIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

interface ImageUploaderProps {
  handleFileUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ handleFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    handleFileUpload(uploadedFile);
  }, [handleFileUpload]);

  const handleRemove = () => {
    setFile(null);
    handleFileUpload(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  return (
    <>
      <Stack direction={"column"} spacing={3}>
        <Stack direction={"column"}>
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              marginBottom: theme.spacing(2),
            })}
          >
            Resume
          </Typography>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
            })}
          >
            We’ll try to automatically extract your skills and experience from
            your resume, saving you some time on the next step!
          </Typography>
        </Stack>
        <Stack
          sx={{
            border: "1px solid #000004",
            borderRadius: "4px",
            padding: "24px 8px",
            width: "360px",
            textAlign: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <Container {...getRootProps()} sx={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            {!file ? (
              <>
                <IconButton>
                  <UploadIcon />
                </IconButton>
                <Typography variant="body1">
                  Drag and drop or browse from your device
                </Typography>
              </>
            ) : (
              <FileDetails>
                <Typography variant="body1">{file.name}</Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRemove}
                  >
                    Remove
                  </Button>
                </Box>
              </FileDetails>
            )}
          </Container>
        </Stack>
      </Stack>
    </>
  );
};
