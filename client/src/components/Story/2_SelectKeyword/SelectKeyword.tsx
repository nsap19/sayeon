import React, { useState, useEffect } from "react";
import { Button, Stack, Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectCreateStory, updateSelectedKeywords } from "store/createStory";
import Polaroid from "../Polaroid";
import { receiverState } from "../types";

const SelectKeyword: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ setStep, receiver }) => {
  const { image, keywords } = useAppSelector(selectCreateStory);

  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const handleClick = (keyword: string) => {
    let filteredKeyword;
    if (selectedKeyword.includes(keyword)) {
      filteredKeyword = selectedKeyword.filter((item) => item !== keyword);
    } else {
      filteredKeyword = [...selectedKeyword, keyword];
    }
    setSelectedKeyword(filteredKeyword);
  };

  const dispatch = useAppDispatch();
  const goToNextStep = () => {
    if (receiver) {
      setStep(3);
    } else {
      setStep(4);
    }
    dispatch(updateSelectedKeywords(selectedKeyword));
  };

  return (
    <>
      <Box sx={{ margin: "10px", width: "100%" }}>
        {receiver ? (
          <p style={{ margin: "10px" }}>
            {receiver.info.nickname}에게 사연보내기
          </p>
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
          <p>사연의 키워드를 모두 골라주세요.</p>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ margin: "10px", flexWrap: "wrap" }}
          >
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                color={
                  selectedKeyword.includes(keyword) ? "primary" : "default"
                }
                onClick={() => handleClick(keyword)}
                sx={{ margin: "5px" }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Button
          disabled={selectedKeyword.length === 0}
          variant="contained"
          onClick={() => goToNextStep()}
          size="large"
          disableElevation={true}
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            margin: "10px 0",
            width: "300px",
            borderRadius: 31.5,
          }}
        >
          다음
        </Button>
      </Box>
    </>
  );
};

export default SelectKeyword;
