import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, Grid } from "@mui/material";
import { ReactComponent as ArrowLeft } from "../../assets/icon/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCreateStory } from "../../store/createStory";
import { receiverState } from "./types";

const DivStyle = styled.div`
  background-color: white;
  font-size: 24px;
  height: 70px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CreateStoryHeaderbar: React.FC<{
  headerName: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  receiver: receiverState;
}> = ({ headerName, setStep, receiver }) => {
  const handleClick = () => {
    if (receiver) {
      setStep((prevStep) => prevStep - 1);
    } else {
      setStep((prevStep) => {
        if (prevStep === 4) return 2; // 랜덤 작성일때는 시간 선택 제외
        return prevStep - 1;
      });
    }
  };

  return (
    <DivStyle>
      <Grid container>
        <Grid item xs={4} sx={{ textAlign: "left" }}>
          <SvgIcon
            sx={{ margin: "5px 0 0 8px" }}
            component={ArrowLeft}
            inheritViewBox
            onClick={handleClick}
          />
        </Grid>
        <Grid item xs={4}>
          {headerName}
        </Grid>
      </Grid>
    </DivStyle>
  );
};

export default CreateStoryHeaderbar;
