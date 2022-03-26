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
      <Box sx={{ margin: "10px", width: "100%", height: "100%" }}>
        {receiver ? (
          <p style={{ margin: "10px" }}>{receiver}에게 사연보내기</p>
        ) : (
          <p style={{ margin: "10px" }}>랜덤 사연보내기</p>
        )}
        <Stack direction="column" alignItems="center">
          <Box sx={{ height: "60%", width: "90%", margin: "10px auto 20px" }}>
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
              <p>선택한 시간 | {waiting}</p>
            </Box>
          )}

          <Stack direction="row" justifyContent="center" spacing={1}>
            {selectedKeyword.map((keyword) => (
              <Chip key={keyword} label={keyword} color="primary" />
            ))}
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Button
          variant="contained"
          size="large"
          disableElevation={true}
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            margin: "10px 0",
            width: "300px",
            borderRadius: 31.5,
          }}
          onClick={() => console.log(",,")}
        >
          보내기
        </Button>
      </Box>
    </>
  );
};

export default ConfirmStory;
