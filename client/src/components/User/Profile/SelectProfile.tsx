import React from "react";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";
import {
  DialogTitle,
  Dialog,
  ImageList,
  ImageListItem,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";


const profilePics = [0, 1, 2, 3, 4, 5, 6, 7];

export interface SelectProfilePIcDialogProps {
  open: boolean;
  selectedValue: number;
  onClose: (value: number) => void;
}

function SelectProfilePIcDialog(props: SelectProfilePIcDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: number) => {
    onClose(value);
  };

  // const updateProfilePic = (data: SelectProfilePIcDialogProps) => {
  //   axios({
  //     method: "put",
  //     url: "/api/users/profile-pic",
  //     data: {
  //       profilePic: data.selectedValue 
  //     }
  //   })
  //   .then((res) => {
  //     console.log('프로필 수정 완료')
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>프로필을 선택해주세요</Box>
          <hr />
        </Box>
      </DialogTitle>
      <ImageList cols={4}>
        {profilePics.map((profilePic) => (
          <ImageListItem
            onClick={() => handleListItemClick(profilePic)}
            key={profilePic}
          >
            <img
              src={require(`../../../assets/images/profile/Profile-${profilePic}.png`)}
              alt="profile pic"
              style={{ width: "50px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button>
        수정
      </Button>
    </Dialog>
  );
}
const SelectProfile: React.FC<{
  profilePic: number;
  setProfilePic: React.Dispatch<React.SetStateAction<number>>;
}> = ({ profilePic, setProfilePic }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: number) => {
    setOpen(false);
    setProfilePic(value);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={require(`../../../assets/images/profile/Profile-${profilePic}.png`)}
        alt="profile pic"
        style={{ width: "100px" }}
      />
      <IconButton
        style={{
          position: "absolute",
          transform: `translateX("-20px")`,
          borderRadius: "20px",
          backgroundColor: "white",
          bottom: 0,
          left: "70px",
          width: "35px",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
        }}
      >
        <Edit onClick={handleClickOpen} />
      </IconButton>
      <SelectProfilePIcDialog
        selectedValue={profilePic}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default SelectProfile;
