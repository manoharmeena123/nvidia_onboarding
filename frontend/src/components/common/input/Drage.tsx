import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ProfileImage = () => {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Box sx={{  textAlign: "center" }}>
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <Box
            sx={{
              width: "368px",
              height: "85px",
              backgroundColor: "#757575",
              margin: "0 auto",
              padding: 2,
              position: "relative",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            {imageList.length === 0 && (
              <Typography
                variant="body1"
                color="#fff"
                sx={{
                    fontSize:"14px",
                }}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
               Drag and drop or browse from your folder
              </Typography>
            )}
            {errors && (
              <Box>
                {errors.maxNumber && (
                  <Typography color="error">
                    Number of selected images exceed maxNumber
                  </Typography>
                )}
                {errors.acceptType && (
                  <Typography color="error">
                    Your selected file type is not allowed
                  </Typography>
                )}
                {errors.maxFileSize && (
                  <Typography color="error">
                    Selected file size exceeds maxFileSize
                  </Typography>
                )}
                {errors.resolution && (
                  <Typography color="error">
                    Selected file does not match your desired resolution
                  </Typography>
                )}
              </Box>
            )}
            {imageList.map((image, index) => (
              <Card key={index} sx={{ position: "relative", width: "100%" }}>
                <CardMedia
                  component="img"
                  height="35px"
                  width="30px"
                  image={image["data_url"]}
                  alt={`uploaded image ${index + 1}`}
                  sx={{ borderRadius: 2 }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.8)",
                    },
                  }}
                  onClick={() => onImageRemove(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button size="small" onClick={onImageUpload}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </ImageUploading>
    </Box>
  );
};

export default ProfileImage;
