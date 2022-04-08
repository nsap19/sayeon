import React from "react";
import { Box, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { updateWaiting } from "store/createStory";
import { useAppDispatch } from "store/hooks";
import { receiverState } from "../types";
import { StyledButton, StyledP, StyledStack } from "../StyledComponent";
import Dove from "assets/images/waiting/dove.png";
import Bike from "assets/images/waiting/bike.png";
import Postbox from "assets/images/waiting/postbox.png";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(2),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: 20,
    },
    "&:first-of-type": {
      borderRadius: 20,
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  height: "130px",
  width: "290px",
  backgroundColor: "white",
  color: "black",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "black",
    backgroundColor: "white",
    outline: "solid 3px #A4CCF3",
    borderTop: "",
  },
}));

const SelectWaiting: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ setStep, receiver }) => {
  const [waiting, setWaiting] = React.useState(1);

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
      image: Dove,
      title: "비둘기",
      content: "비둘기가 날아가고 있어요.",
      description: "사연이 천천히 전달됩니다.",
    },
    {
      value: "2",
      image: Postbox,
      title: "우체통",
      content: "우체부가 배달하고 있어요.",
      description: "사연이 성실히 전달됩니다.",
    },
    {
      value: "3",
      image: Bike,
      title: "자전거",
      content: "자전거를 타고 가고 있어요.",
      description: "사연이 빠르게 전달됩니다.",
    },
  ];

  const dispatch = useAppDispatch();
  const goToNextStep = () => {
    setStep(4);
    dispatch(updateWaiting(waiting));
  };

  return (
    <StyledStack>
      <Stack direction="column" alignItems="center" sx={{ width: "320px" }}>
        {receiver ? (
          <StyledP>{receiver.info.nickname}에게 사연보내기</StyledP>
        ) : (
          <StyledP>랜덤 사연보내기</StyledP>
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
              value={parseInt(waitingOption.value)}
              aria-label={waitingOption.value}
              key={waitingOption.value}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <img
                  style={{ width: "50px" }}
                  src={waitingOption.image}
                  alt={waitingOption.value}
                />

                <Stack
                  direction="column"
                  sx={{ textAlign: "left", width: "150px" }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontFamily: "S-CoreDream-6Bold",
                    }}
                  >
                    {waitingOption.title}
                  </p>
                  <p style={{ fontSize: "12px" }}>{waitingOption.content}</p>
                  <p style={{ fontSize: "12px" }}>
                    {waitingOption.description}
                  </p>
                </Stack>
              </Stack>
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </Stack>

      <Box>
        <StyledButton
          variant="contained"
          size="large"
          disableElevation={true}
          onClick={() => goToNextStep()}
        >
          다음
        </StyledButton>
      </Box>
    </StyledStack>
  );
};

export default SelectWaiting;
