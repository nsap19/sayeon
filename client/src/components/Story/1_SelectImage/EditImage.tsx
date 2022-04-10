import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { ReactComponent as Image } from "assets/icon/image.svg";
import Cropper from "react-cropper";

const EditImage: React.FC<{
  imageReady: boolean;
  imageName: string;
  image: string;
  setCropper: React.Dispatch<any>;
  setImageReady: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ imageReady, imageName, image, setCropper, setImageReady }) => {
  return (
    <Box
      // 최소 window 크기 320px 기준 = 양 옆 마진 10px + 최소 사진 너비 300px
      sx={{
        margin: "0 10px",
        minWidth: "300px",
        height: "300px",
        backgroundColor: imageReady ? "transparent" : "white",
        borderRadius: imageReady ? "" : "20px",
        boxShadow: imageReady ? "" : "0px 10px 30px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: imageReady ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
        }}
      >
        {imageName ? <CircularProgress /> : <Image />}
      </Box>
      <Cropper
        style={{
          maxHeight: "300px",
          maxWidth: "300px",
          boxShadow: "0px 10px 30px rgb(0 0 0 / 5%)",
        }}
        aspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance: any) => {
          setCropper(instance);
        }}
        guides={true}
        zoomOnWheel={false}
        ready={() => setImageReady(true)}
      />
    </Box>
  );
};

export default EditImage;
