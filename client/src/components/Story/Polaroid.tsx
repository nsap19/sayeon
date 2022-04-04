import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as Close } from "../../assets/icon/close.svg";

const defaultPolaroidRatios = {
  MINI: 54 / 86,
  SQUARE: 72 / 86,
  WIDE: 108 / 86,
};

const defaultImageAndFrameRatios = {
  MINI: 42 / 54,
  SQUARE: 62 / 72,
  WIDE: 99 / 108,
};

const Polaroid: React.FC<{
  imageUrl: string;
  imageType: "MINI" | "SQUARE" | "WIDE";
  senderNickname: string;
  dateReceived: string;
}> = ({ imageUrl, imageType, senderNickname, dateReceived }) => {
  const [open, setOpen] = React.useState(false);
  const [height, setHeight] = useState(0);
  const [dialogHeight, setDialogHeight] = useState(0);
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const dialogDiv = useCallback((node) => {
    if (node !== null) {
      setDialogHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const StyledImage = styled.img`
    max-width: ${defaultImageAndFrameRatios[imageType] * 100}%;
    max-height: 100%;
    transform: translateY(12.32%);
    width: 100%;
    border: solid rgba(140, 136, 136, 0.3) 1px;
  `;

  const PolaroidFrame = styled.div`
    background-color: white;
    aspect-ratio: ${defaultPolaroidRatios[imageType]};
    text-align: center;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    height: 100%;
  `;

  const Nickname = styled.p`
    position: absolute;
    bottom: ${height / 20}px;
    right: ${height / 20}px;
    font-size: min(16px, ${height / 20}px);
  `;

  const DialogNickname = styled.p`
    position: absolute;
    bottom: ${dialogHeight / 20}px;
    right: ${dialogHeight / 20}px;
    font-size: min(16px, ${dialogHeight / 20}px);
  `;

  const HiddenAlert = styled.p`
    position: absolute;
    top: 37.68%;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: min(16px, ${height / 20}px);
    color: white;
  `;

  const DialogHiddenAlert = styled.p`
    position: absolute;
    top: 37.68%;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: min(16px, ${dialogHeight / 20}px);
    color: white;
  `;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hidden = new Date().getTime() < new Date(dateReceived).getTime();

  const hourDifference = Math.round(
    (new Date(dateReceived).getTime() - new Date().getTime()) / 36e5
  );

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
        <PolaroidFrame ref={dialogDiv}>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: "1",
              right: "-7px",
              top: "-24px",
              padding: 0,
            }}
            onClick={handleClose}
          >
            <Close style={{ fill: "white" }} />
          </IconButton>
          <StyledImage
            src={
              hidden
                ? require(`../../assets/images/default/${imageType}_default.png`)
                : imageUrl
            }
            alt="img"
            onClick={handleClickOpen}
          />
          {hidden && (
            <DialogHiddenAlert>
              <p>{hourDifference}시간 뒤에</p>
              <p>사연이 열립니다.</p>
            </DialogHiddenAlert>
          )}
          <DialogNickname>{senderNickname}</DialogNickname>
        </PolaroidFrame>
      </Dialog>

      <PolaroidFrame ref={div}>
        <StyledImage
          src={
            hidden
              ? require(`../../assets/images/default/${imageType}_default.png`)
              : imageUrl
          }
          alt="img"
          onClick={handleClickOpen}
        />
        {hidden && (
          <HiddenAlert>
            <p>{hourDifference}시간 뒤에</p>
            <p>사연이 열립니다.</p>
          </HiddenAlert>
        )}
        <Nickname>{senderNickname}</Nickname>
      </PolaroidFrame>
    </>
  );
};

export default Polaroid;
