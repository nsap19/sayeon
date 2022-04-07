import React, { useEffect } from "react";
import { ReactComponent as Edit } from "assets/icon/edit.svg";
import { ReactComponent as Close } from "assets/icon/close.svg";
import {
  DialogTitle,
  Dialog,
  ImageList,
  ImageListItem,
  IconButton,
  Box,
} from "@mui/material";
import axios from "axios";
import "./Profile.css";

const profilePics = Array.from({ length: 36 }, (x, i) => i);

export interface SelectProfilePIcDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (value: number) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectProfilePIcDialog(props: SelectProfilePIcDialogProps) {
  const { onClose, selectedValue, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
    onClose(selectedValue);
  };

  const updateProfilePic = (value: number) => {
    onClose(value);
    const token = localStorage.getItem("token");
    setOpen(false);
    axios({
      method: "put",
      url: "userInfo/profile-pic",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        profilePic: value,
      },
    })
      .then((res) => {
        console.log("프로필 수정 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 30 },
      }}
      onClose={handleClose}
      open={open}
      fullWidth={true}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>프로필 선택</Box>
          <Box>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Box sx={{ padding: "12px 24px 24px", overflowY: "auto" }}>
        <ImageList cols={4} gap={15}>
          {profilePics.map((profilePic) => (
            <ImageListItem
              onClick={() => updateProfilePic(profilePic)}
              key={profilePic}
            >
              <img
                src={require(`../../../assets/images/profile/Avatar-${profilePic}.svg`)}
                alt="profile pic"
                style={{ width: "100%", margin: "auto" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Dialog>
  );
}
const ChangeProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios({
      method: "get",
      url: "userInfo/myinfo",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setProfilePic(res.data.data.memberProfile.profilePic);
      })
      .catch((err) => {
        if (err.response.status) {
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
  }, [profilePic]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: number) => {
    // setOpen(false);
    setProfilePic(value);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={require(`../../../assets/images/profile/Avatar-${profilePic}.svg`)}
        alt="profile pic"
        style={{ width: "60px" }}
      />
      <IconButton
        style={{
          position: "absolute",
          transform: `translateX("-20px")`,
          borderRadius: "20px",
          backgroundColor: "white",
          bottom: 0,
          left: "45px",
          width: "25px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
        }}
        onClick={handleClickOpen}
      >
        <Edit />
      </IconButton>
      <SelectProfilePIcDialog
        selectedValue={profilePic}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
      />
    </div>
  );
};

export default ChangeProfile;
