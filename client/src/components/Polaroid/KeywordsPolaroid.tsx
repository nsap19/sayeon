import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import PolaroidDialog from "./PolaroidDialog";

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
  keywords: string[];
}> = ({ imageUrl, imageType, senderNickname, dateReceived, keywords }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
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

  const HiddenAlert = styled.div`
    position: absolute;
    top: 37.68%;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: min(16px, ${height / 20}px);
    color: white;
  `;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hidden = new Date().getTime() < new Date(dateReceived).getTime();

  const hourDifference =
    (new Date(dateReceived).getTime() - new Date().getTime()) / 36e5;

  return (
    <>
      <PolaroidDialog
        handleClose={handleClose}
        open={open}
        imageType={imageType}
        hidden={hidden}
        imageUrl={imageUrl}
        handleClickOpen={handleClickOpen}
        hourDifference={hourDifference}
        senderNickname={senderNickname}
        keywords={keywords}
      />

      <PolaroidFrame ref={div} onClick={handleClickOpen}>
        <StyledImage
          src={
            hidden
              ? require(`../../assets/images/default/${imageType}_default.png`)
              : imageUrl
          }
          alt="img"
        />

        {hidden && (
          <HiddenAlert>
            {hourDifference >= 1 ? (
              <>
                <p>{Math.round(hourDifference)}시간 뒤에</p>
                <p>사연이 열립니다.</p>
              </>
            ) : (
              <>
                <p>{Math.round(hourDifference * 60)}분 뒤에</p>
                <p>사연이 열립니다.</p>
              </>
            )}
          </HiddenAlert>
        )}
        <Nickname>{senderNickname}</Nickname>
      </PolaroidFrame>
    </>
  );
};

export default Polaroid;
