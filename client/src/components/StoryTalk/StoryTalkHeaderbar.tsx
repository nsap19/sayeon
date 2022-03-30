import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, Grid } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow-left.svg";
import { useNavigate } from "react-router-dom";

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

const StoryTalkHeaderbar: React.FC<{ headerName: string | undefined }> = ({
  headerName,
}) => {
  const navigate = useNavigate();

  return (
    <DivStyle>
      <Grid container>
        <Grid item xs={4} sx={{ textAlign: "left" }}>
          <SvgIcon
            sx={{ margin: "5px 0 0 8px" }}
            component={ArrowLeft}
            inheritViewBox
            onClick={() => navigate(-1)}
          />
        </Grid>
        <Grid item xs={4}>
          {headerName}
        </Grid>
      </Grid>
    </DivStyle>
  );
};

export default StoryTalkHeaderbar;
