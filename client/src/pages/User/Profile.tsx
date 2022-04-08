import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import ChangeProfile from "components/User/Profile/ChangeProfile";
import { Stack, Button, Box, Snackbar, Alert } from "@mui/material";
import Headerbar from "components/Headerbar";
import ChangeNickname from "components/User/Profile/ChangeNickname";
import ChangeLocation from "components/User/Profile/ChangeLocation";
import ChangePassword from "components/User/Profile/ChangePassword";

const Profile = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", {
      state: { openSnackbar: true, content: "logout" },
    });
  };

  // 회원탈퇴 페이지로 이동
  const goDeleteAccount = () => {
    navigate("/delete-account");
  };

  return (
    <Stack sx={{ height: "calc(100% - 70px)" }}>
      <Headerbar headerName={"내 정보"} />

      <Stack
        direction="column"
        justifyContent="center"
        sx={{
          flex: "1 1 auto",
          height: "calc(100% - 70px - 70px)",
          overflowY: "auto",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          margin="20% 5% 5%"
        >
          <ChangeProfile />
          <ChangeNickname />
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Box sx={{ height: 140 }}>
            <ChangeLocation />
          </Box>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <Box>
            <Button
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                marginTop: "10px",
                width: "250px",
                height: "50px",
                backgroundColor: "#B6B6B6",
                borderRadius: 31.5,
              }}
              disableElevation={true}
              size="large"
              variant="contained"
              onClick={handleOpenDialog}
            >
              비밀번호 수정
            </Button>
            <ChangePassword
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </Box>
          <Button
            sx={{
              color: "white",
              fontFamily: "S-CoreDream-4Regular",
              marginTop: "10px",
              width: "250px",
              height: "50px",
              backgroundColor: "#B6B6B6",
              borderRadius: 31.5,
            }}
            disableElevation={true}
            size="large"
            variant="contained"
            onClick={logout}
          >
            로그아웃
          </Button>
          <Button
            sx={{
              color: "white",
              fontFamily: "S-CoreDream-4Regular",
              marginTop: "10px",
              width: "250px",
              height: "50px",
              backgroundColor: "#B6B6B6",
              borderRadius: 31.5,
            }}
            disableElevation={true}
            size="large"
            variant="contained"
            onClick={goDeleteAccount}
          >
            회원탈퇴
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
