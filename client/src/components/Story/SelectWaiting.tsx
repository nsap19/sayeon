import React from "react";
import {
  Button,
  Stack,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { selectCreateStory, updateWaiting } from "../../store/createStory";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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
  height: "33%",
  backgroundColor: "white",
  fontSize: "24px",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "white",
    outline: "solid 3px #A4CCF3",
    borderTop: "",
  },
}));

const SelectWaiting: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
  const { receiver } = useAppSelector(selectCreateStory);
  const [waiting, setWaiting] = React.useState("list");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextWaiting: string
  ) => {
    if (nextWaiting !== null) {
      setWaiting(nextWaiting);
    }
  };

  const dispatch = useAppDispatch();
  const goToNextStep = () => {
    setStep(3);
    dispatch(updateWaiting(waiting));
  };

  return (
    <>
      {receiver ? <p>{receiver}에게 사연보내기</p> : <p>랜덤 사연보내기</p>}
      <StyledToggleButtonGroup
        size="large"
        orientation="vertical"
        value={waiting}
        exclusive
        onChange={handleChange}
        sx={{ width: "90%", height: "70%" }}
      >
        <StyledToggleButton value="dove" aria-label="dove">
          🦅 비둘기
        </StyledToggleButton>
        <StyledToggleButton value="post" aria-label="post">
          🏤 우체통
        </StyledToggleButton>
        <StyledToggleButton value="bike" aria-label="bike">
          🚲 자전거
        </StyledToggleButton>
      </StyledToggleButtonGroup>
      <Button variant="contained" onClick={() => goToNextStep()}>
        다음
      </Button>
    </>
  );
};

export default SelectWaiting;
