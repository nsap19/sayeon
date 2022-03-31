import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, Grid } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow-left.svg";
import { ReactComponent as Send } from "assets/icon/send.svg";
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

const StoryTalkHeaderbar: React.FC<{
  headerName: string | undefined;
  otherUserInfo: { profilePic: number; nickname: string } | undefined;
  otherUserId: string | undefined;
}> = ({ headerName, otherUserInfo, otherUserId }) => {
  const navigate = useNavigate();

  return (
    <DivStyle>
      <Grid container alignItems="center">
        <Grid item xs={4} sx={{ textAlign: "left" }}>
          <SvgIcon
            sx={{ margin: "5px 0 0 8px" }}
            component={ArrowLeft}
            inheritViewBox
            onClick={() => navigate(-1)}
          />
        </Grid>

        <Grid item xs={4} container alignItems="center">
          {otherUserInfo !== undefined && (
            <img
              src={require(`../../assets/images/profile/Avatars-${otherUserInfo.profilePic}.png`)}
              alt="profile pic"
              style={{ width: "40px", marginRight: "10px" }}
            />
          )}
          <span>{headerName}</span>
        </Grid>

        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <SvgIcon
            sx={{ margin: "5px 12px 0 0" }}
            component={Send}
            inheritViewBox
            onClick={() =>
              navigate("/send", {
                state: { receiverId: otherUserId, receiverInfo: otherUserInfo },
              })
            }
          />
        </Grid>
      </Grid>
    </DivStyle>
  );
};

export default StoryTalkHeaderbar;
