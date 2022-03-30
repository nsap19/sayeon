import React from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import ChangeProfile from "../../components/User/Profile/ChangeProfile";
import Grid from "@mui/material/Grid";
import { Stack, Button } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import ChangeNickname from 'components/User/Profile/ChangeNickname';
import ChangeLocation from 'components/User/Profile/ChangeLocation';


const Profile = () => {
  const navigate = useNavigate();


  // 비밀번호 변경 페이지로 이동
  const goChangePassword = () => {
    navigate('/changePassword');
  }

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  // 회원탈퇴 페이지로 이동
  const goDeleteAccount = () => {
    navigate('/deleteAccount');
  }

  return (
    <Stack sx={{ height: "calc(100% - 56px)" }}>
      <Headerbar headerName={"내 정보"} />
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={3}
      >
        <Grid container columns={12} sx={{ mb: 4 }}>
          <Grid container sx={{ justifyContent: 'center', ml: 4 }} item xs={4}>
            {/* <ChangeProfile profilePic={profilePic} setProfilePic={setProfilePic} /> */}
            <ChangeProfile />
          </Grid>
          <Grid container item xs={6}  sx={{ ml: 2, justifyContent: 'center', alignItems: 'center' }}>
            <ChangeNickname />
          </Grid>
        </Grid>
        <ChangeLocation />
        <Stack spacing={2}>
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
    </Stack>
  )
}


export default Profile;
