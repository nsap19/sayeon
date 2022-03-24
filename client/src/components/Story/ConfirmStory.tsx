import React from "react";
import { selectCreateStory } from "../../store/createStory";
import { useAppSelector } from "../../store/hooks";
import Polaroid from "./Polaroid";
import { Box, Button, Stack, Chip } from "@mui/material";

const ConfirmStory: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const { receiver, image, selectedKeyword, waiting } =
    useAppSelector(selectCreateStory);

  return (
    <>
      {receiver ? <p>{receiver}에게 사연보내기</p> : <p>랜덤 사연보내기</p>}
      <Box sx={{ height: "60%", width: "90%" }}>
        <Box sx={{ height: "100%" }}>
          <Polaroid
            imageUrl={image.url}
            imageType={image.type}
            senderNickname={""}
          />
        </Box>
      </Box>
      {waiting && (
        <Box>
          <p>{waiting}선택한 시간</p>
        </Box>
      )}

      <Stack direction="row" spacing={1}>
        {selectedKeyword.map((keyword) => (
          <Chip key={keyword} label={keyword} color="primary" />
        ))}
      </Stack>
      <Button variant="contained" onClick={() => console.log(",,")}>
        보내기
      </Button>
    </>
  );
};

export default ConfirmStory;
