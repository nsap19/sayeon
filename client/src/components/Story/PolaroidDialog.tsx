import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { Dialog, IconButton } from "@mui/material";
import { ReactComponent as Close } from "assets/icon/close.svg";
import ReactCardFlip from "react-card-flip";

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

const PolaroidDialog: React.FC<{
  handleClose: () => void;
  handleClickOpen: () => void;
  open: boolean;
  imageType: "MINI" | "SQUARE" | "WIDE";
  hidden: boolean;
  imageUrl: string;
  senderNickname: string;
  hourDifference: number;
}> = ({
  handleClose,
  handleClickOpen,
  open,
  imageType,
  hidden,
  imageUrl,
  senderNickname,
  hourDifference,
}) => {
  const [flip, setFlip] = useState(false);
  const [dialogHeight, setDialogHeight] = useState(0);
  const dialogDiv = useCallback((node) => {
    if (node !== null) {
      setDialogHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const PolaroidFrame = styled.div`
    background-color: white;
    aspect-ratio: ${defaultPolaroidRatios[imageType]};
    text-align: center;
    box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
      0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
    position: relative;
    height: 100%;
  `;

  const StyledImage = styled.img`
    max-width: ${defaultImageAndFrameRatios[imageType] * 100}%;
    max-height: 100%;
    transform: translateY(12.32%);
    width: 100%;
    border: solid rgba(140, 136, 136, 0.3) 1px;
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

  const DialogNickname = styled.p`
    position: absolute;
    bottom: ${dialogHeight / 20}px;
    right: ${dialogHeight / 20}px;
    font-size: min(16px, ${dialogHeight / 20}px);
  `;

  const Keywords = styled.div`
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  `;

  const keywords = ["키워드", "키워드", "키워드", "키워드"];

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 0,
          overflowY: "unset",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      onClose={handleClose}
      open={open}
      disableScrollLock={true}
    >
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

      <ReactCardFlip isFlipped={flip}>
        <PolaroidFrame ref={dialogDiv} onClick={() => setFlip(!flip)}>
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

        <PolaroidFrame onClick={() => setFlip(!flip)}>
          <Keywords>
            {keywords.map((keyword) => (
              <p key={keyword}>{keyword}</p>
            ))}
          </Keywords>
        </PolaroidFrame>
      </ReactCardFlip>
    </Dialog>
  );
};

export default PolaroidDialog;
