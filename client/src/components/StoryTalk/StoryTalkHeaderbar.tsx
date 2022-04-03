import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, Grid } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow-left.svg";
import { ReactComponent as Send } from "assets/icon/send.svg";
import { useNavigate } from "react-router-dom";
import RequestDialog from "./RequestDialog";

const DivStyle = styled.div`
  background-color: white;
  font-size: 18px;
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RequestDialog
        open={open}
        onClose={handleClose}
        otherUserId={otherUserId}
      />
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

          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="center"
          >
            {otherUserInfo !== undefined && (
              <img
                src={require(`../../assets/images/profile/Avatars-${otherUserInfo.profilePic}.png`)}
                alt="profile pic"
                style={{ width: "30px", marginRight: "10px" }}
              />
            )}
            <span>{headerName}</span>
          </Grid>

          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <SvgIcon
              sx={{ margin: "5px 12px 0 0" }}
              component={Send}
              inheritViewBox
              onClick={handleClickOpen}
            />
          </Grid>
        </Grid>
      </DivStyle>
    </>
  );
};

export default StoryTalkHeaderbar;
