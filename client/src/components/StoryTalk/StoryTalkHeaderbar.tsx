import React, { useState } from "react";
import styled from "@emotion/styled";
import { SvgIcon, Grid } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow-left.svg";
import { ReactComponent as Send } from "assets/icon/setting.svg";
import RequestDialog from "./RequestDialog";

const DivStyle = styled.div`
  background-color: white;
  font-size: 18px;
  height: 70px;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
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
  setStoryTalkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbar: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  headerName,
  otherUserInfo,
  otherUserId,
  setStoryTalkOpen,
  setOpen,
  setSnackbar,
}) => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenRequestDialog(true);
  };

  const handleClose = () => {
    setOpenRequestDialog(false);
  };

  return (
    <>
      <RequestDialog
        open={openRequestDialog}
        onClose={handleClose}
        otherUserId={otherUserId}
        setOpen={setOpen}
        setSnackbar={setSnackbar}
      />
      <DivStyle>
        <Grid container alignItems="center">
          <Grid item xs={2} sx={{ textAlign: "left" }}>
            <SvgIcon
              sx={{ margin: "5px 0 0 8px" }}
              component={ArrowLeft}
              inheritViewBox
              onClick={() => {
                setStoryTalkOpen(false);
              }}
            />
          </Grid>

          <Grid
            item
            xs={8}
            container
            alignItems="center"
            justifyContent="center"
          >
            {otherUserInfo !== undefined && (
              <img
                src={require(`../../assets/images/profile/Avatar-${otherUserInfo.profilePic}.svg`)}
                alt="profile pic"
                style={{ width: "30px", marginRight: "10px" }}
              />
            )}
            <span>{headerName}</span>
          </Grid>

          <Grid item xs={2} sx={{ textAlign: "right" }}>
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
