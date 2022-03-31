import React, { useEffect } from "react";
import {
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { selectCreateStory, updateWaiting } from "store/createStory";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { receiverState } from "../types";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(2),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: 30,
    },
    "&:first-of-type": {
      borderRadius: 30,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  height: "130px",
  backgroundColor: "white",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "white",
    outline: "solid 3px #A4CCF3",
    borderTop: "",
  },
}));

const SelectWaiting: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ setStep, receiver }) => {
  const [waiting, setWaiting] = React.useState(0);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextWaiting: number
  ) => {
    if (nextWaiting !== null) {
      setWaiting(nextWaiting);
    }
  };

  const waitingOptions = [
    {
      value: "1",
      image: "🦅",
      title: "비둘기 1일",
      content: "비둘기가 날아가고 있어요.",
      description: "편지가 도착하는데 하루가 소요됩니다.",
    },
    {
      value: "2",
      image: "🏤",
      title: "우체통 3시간",
      content: "우체부가 배달하고 있어요.",
      description: "편지가 도착하는데 세 시간이 소요됩니다.",
    },
    {
      value: "3",
      image: "🚲",
      title: "자전거 1시간",
      content: "자전거를 타고 가고 있어요.",
      description: "편지가 도착하는데 한 시간이 소요됩니다.",
    },
  ];

  const dispatch = useAppDispatch();
  const goToNextStep = () => {
    setStep(4);
    dispatch(updateWaiting(waiting));
  };

  return (
    <>
      <Box sx={{ margin: "10px", width: "100%", height: "100%" }}>
        {receiver ? (
          <p style={{ margin: "10px" }}>
            {receiver.info.nickname}에게 사연보내기
          </p>
        ) : (
          <p style={{ margin: "10px" }}>랜덤 사연보내기</p>
        )}
        <StyledToggleButtonGroup
          size="large"
          orientation="vertical"
          value={waiting}
          exclusive
          onChange={handleChange}
          sx={{ width: "100%" }}
        >
          {waitingOptions.map((waitingOption) => (
            <StyledToggleButton
              value={waitingOption.value}
              aria-label={waitingOption.value}
              key={waitingOption.value}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box>
                  <p style={{ fontSize: "36px" }}>{waitingOption.image}</p>
                </Box>
                <Stack direction="column" sx={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontSize: "18px",
                      fontFamily: "S-CoreDream-6Bold",
                    }}
                  >
                    {waitingOption.title}
                  </p>
                  <p style={{ fontSize: "14px" }}>{waitingOption.content}</p>
                  <p style={{ fontSize: "14px" }}>
                    {waitingOption.description}
                  </p>
                </Stack>
              </Stack>
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
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
          onClick={() => goToNextStep()}
        >
          다음
        </Button>
      </Box>
    </>
  );
};

export default SelectWaiting;
