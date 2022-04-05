import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";

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

  return (
    <PolaroidFrame ref={div}>
      <StyledImage src={imageUrl} alt="img" />
      <Nickname>{senderNickname}</Nickname>
    </PolaroidFrame>
  );
};

export default Polaroid;
