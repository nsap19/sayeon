import React, { useState, useEffect } from "react";
import { Button, Stack, Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCreateStory,
  updateSelectedKeyword,
} from "../../store/createStory";

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
      {receiver ? <p>{receiver}에게 사연보내기</p> : <p>랜덤 사연보내기</p>}
      <Box sx={{ height: "50%", width: "90%" }}>
        {imageUrl && <img src={imageUrl} alt="" style={{ width: "100%" }} />}
        <Stack direction="row" spacing={1}>
          {keywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              color={selectedKeyword.includes(keyword) ? "primary" : "default"}
              onClick={() => handleClick(keyword)}
            />
          ))}
        </Stack>
      </Box>
      <Button
        disabled={selectedKeyword.length === 0}
        variant="contained"
        onClick={() => goToNextStep()}
      >
        다음
      </Button>
    </>
  );
};

export default SelectKeyword;
