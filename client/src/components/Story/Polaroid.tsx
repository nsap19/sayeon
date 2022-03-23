import React from "react";
import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as Close } from "../../assets/icon/close-circle.svg";

const Polaroid: React.FC<{
  imageUrl: string;
  imageType: "mini" | "square" | "wide";
  senderNickname: string;
}> = ({ imageUrl, imageType, senderNickname }) => {
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
    width: 100%;
  `;

  const PolaroidFrame = styled.div`
    background-color: white;
    aspect-ratio: ${defaultPolaroidRatios[imageType]};
    text-align: center;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
  `;

  const Nickname = styled.p`
    position: absolute;
    bottom: 5px;
    right: 5px;
  `;

  const [open, setOpen] = React.useState(false);

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

      <PolaroidFrame>
        <StyledImage src={imageUrl} alt="img" onClick={handleClickOpen} />
        <Nickname>{senderNickname}</Nickname>
      </PolaroidFrame>
    </>
  );
};

export default Polaroid;
