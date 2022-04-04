import React, { useState } from "react";
import { Stack, Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectCreateStory, updateSelectedKeywords } from "store/createStory";
import Polaroid from "../Polaroid";
import { receiverState } from "../types";
import { StyledButton, StyledP, StyledStack } from "../StyledComponent";

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
      if (selectedKeyword.length < 5) {
        filteredKeyword = [...selectedKeyword, keyword];
      } else filteredKeyword = [...selectedKeyword];
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
    <StyledStack>
      <Stack direction="column" alignItems="center" sx={{ width: "320px" }}>
        {receiver ? (
          <StyledP>{receiver.info.nickname}에게 사연보내기</StyledP>
        ) : (
          <StyledP>랜덤 사연보내기</StyledP>
        )}
        <Box sx={{ maxHeight: "250px", margin: "10px" }}>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Polaroid
              imageUrl={image.url}
              imageType={image.type}
              senderNickname={""}
              dateReceived={new Date().toString()}
            />
          </Box>
        </Box>
        <p>사연의 키워드를 모두 골라주세요.</p>
        <p
          style={{
            fontSize: "12px",
            color: "#8C8888",
            display: selectedKeyword.length === 5 ? "block" : "none",
          }}
        >
          키워드는 최대 다섯개까지 선택하실 수 있습니다.
        </p>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ margin: "10px", flexWrap: "wrap" }}
        >
          {keywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              color={selectedKeyword.includes(keyword) ? "primary" : "default"}
              onClick={() => handleClick(keyword)}
              sx={{
                margin: "5px",
                color: selectedKeyword.includes(keyword) ? "white" : "default",
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Box>
        <StyledButton
          disabled={selectedKeyword.length === 0}
          variant="contained"
          onClick={() => goToNextStep()}
          size="large"
          disableElevation={true}
        >
          다음
        </StyledButton>
      </Box>
    </StyledStack>
  );
};

export default SelectKeyword;
