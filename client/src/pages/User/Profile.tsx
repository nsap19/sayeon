import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import ChangeProfile from "../../components/User/Profile/ChangeProfile";
import { Stack, Button, Box, Snackbar, Alert } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import ChangeNickname from "components/User/Profile/ChangeNickname";
import ChangeLocation from "components/User/Profile/ChangeLocation";

const Profile = () => {
  const navigate = useNavigate();

  // 비밀번호 변경 페이지로 이동
  const goChangePassword = () => {
    navigate("/change-password");
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    setAlertState("success");
    setOpen(true);
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  };

  // 회원탈퇴 페이지로 이동
  const goDeleteAccount = () => {
    navigate("/delete-account");
  };

  // 스낵바 관련
  const [open, setOpen] = useState(false);
  const [alertState, setAlertState] = useState<
    "error" | "info" | "success" | "warning"
  >("error");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack sx={{ height: "calc(100% - 56px)" }}>
      <Headerbar headerName={"내 정보"} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertState}
          sx={{ width: "100%" }}
        >
          {alertState === "success" ? "로그아웃 되었습니다." : null}
        </Alert>
      </Snackbar>

      <Stack spacing={3} my={5} marginLeft="10%">
        <ChangeProfile />
      </Stack>
      <Stack spacing={3}>
        <Box sx={{ height: 25 }}>
          <ChangeNickname />
        </Box>
        <Box sx={{ height: 150 }}>
          <ChangeLocation />
        </Box>
      </Stack>
      <Stack alignItems="center" spacing={2}>
        <Button
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            marginTop: "30px",
            width: "300px",
            backgroundColor: "#B6B6B6",
            borderRadius: 31.5,
          }}
          disableElevation={true}
          size="large"
          variant="contained"
          onClick={goChangePassword}
        >
          비밀번호 수정
        </Button>
        <Button
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            marginTop: "30px",
            width: "300px",
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
            marginTop: "30px",
            width: "300px",
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
  );
};

export default Profile;
