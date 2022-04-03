import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as Close } from "../../assets/icon/close-circle.svg";

const StoryListPolaroid: React.FC<{
  imageUrl: string;
  imageType: "mini" | "square" | "wide";
  senderNickname: string;
}> = ({ imageUrl, imageType, senderNickname }) => {
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = useState(0);
  const div = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const defaultPolaroidRatios = {
    mini: 54 / 86,
    square: 72 / 86,
    wide: 108 / 86,
  };

  const defaultImageAndFrameRatios = {
    mini: 42 / 54,
    square: 62 / 72,
    wide: 99 / 108,
  };

  const StyledImage = styled.img`
    max-width: ${defaultImageAndFrameRatios[imageType] * 100}%;
    max-height: 100%;
    transform: translateY(12.32%);
    width: 80%;
  `;

  const PolaroidFrame = styled.div`
    background-color: white;
    aspect-ratio: ${defaultPolaroidRatios[imageType]};
    text-align: center;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    width: 100%;
  `;

  const Nickname = styled.p`
    position: absolute;
    bottom: 10px;
    right: 5px;
    font-size: ${width / 20}px;
  `;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 0, overflowY: "unset" },
        }}
        onClose={handleClose}
        open={open}
        disableScrollLock={true}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "90%",
            top: "-40px",
            zIndex: "1",
          }}
          onClick={handleClose}
        >
          <Close style={{ fill: "white" }} />
        </IconButton>
        <PolaroidFrame>
          <StyledImage
            // src={require(`../../assets/images/test/${imageUrl}`)}
            src={imageUrl}
            alt="img"
            onClick={handleClickOpen}
          />
          <Nickname>{senderNickname}</Nickname>
        </PolaroidFrame>
      </Dialog>

      <PolaroidFrame ref={div}>
        <StyledImage src={imageUrl} alt="img" onClick={handleClickOpen} />
        <Nickname>{senderNickname}</Nickname>
      </PolaroidFrame>
    </>
  );
};

export default StoryListPolaroid;
