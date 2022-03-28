import React, { useState } from "react";
import { Button, Stack, Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectCreateStory, updateSelectedKeyword } from "store/createStory";
import Polaroid from "../Polaroid";

const SelectKeyword: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const { receiver, image } = useAppSelector(selectCreateStory);
  const imageUrl = image.url;

  const keywords = ["빵", "음료수", "치즈"];
  const [selectedKeyword, setSelectedKeyword] = useState<string[]>([]);

  const handleClick = (keyword: string) => {
    console.log(keyword);
    let filteredKeyword;
    if (selectedKeyword.includes(keyword)) {
      filteredKeyword = selectedKeyword.filter((item) => item !== keyword);
    } else {
      filteredKeyword = [...selectedKeyword, keyword];
    }
    console.log(filteredKeyword);
    setSelectedKeyword(filteredKeyword);
  };

  const dispatch = useAppDispatch();
  const goToNextStep = () => {
    setStep(4);
    dispatch(updateSelectedKeyword(selectedKeyword));
  };

  return (
    <>
      <Box sx={{ margin: "10px", width: "100%" }}>
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
          <p>사연의 키워드를 모두 골라주세요.</p>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ margin: "10px" }}
          >
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                color={
                  selectedKeyword.includes(keyword) ? "primary" : "default"
                }
                onClick={() => handleClick(keyword)}
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
