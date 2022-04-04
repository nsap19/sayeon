import React from "react";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";
import { ReactComponent as Close } from "../../../assets/icon/close.svg";
import {
  DialogTitle,
  Dialog,
  ImageList,
  ImageListItem,
  IconButton,
  Box,
} from "@mui/material";

const profilePics = Array.from({ length: 36 }, (x, i) => i);

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
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>프로필 선택</Box>
          <Box>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: "8px",
                top: "10px",
              }}
              onClick={handleClose}
            >
              <Close fill="#8c8888" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Box sx={{ padding: "12px 24px 24px", overflowY: "auto" }}>
        <ImageList cols={4} gap={15}>
          {profilePics.map((profilePic) => (
            <ImageListItem
              onClick={() => handleListItemClick(profilePic)}
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
        src={require(`../../../assets/images/profile/Avatar-${profilePic}.svg`)}
        alt="profile pic"
        style={{ width: "80px", margin: "20px" }}
      />
      <IconButton
        style={{
          position: "absolute",
          transform: `translateX("-20px")`,
          borderRadius: "20px",
          backgroundColor: "white",
          bottom: "20px",
          left: "75px",
          width: "35px",
          height: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 3px 6px rgb(0 0 0 / 10%), 0 3px 6px rgb(0 0 0 / 20%)",
        }}
        onClick={handleClickOpen}
      >
        <Edit />
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
