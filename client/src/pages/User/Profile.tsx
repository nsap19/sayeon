import React, { useState } from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SelectProfile from "../../components/User/Profile/SelectProfile";
import Grid from "@mui/material/Grid";
import LocationJson from "../../assets/json/location.json";
import { ReactComponent as Edit } from "../../assets/icon/edit.svg";
import { ReactComponent as Location } from "../../assets/icon/location.svg";
import { Stack, Button, Box, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import Headerbar from "../../components/Headerbar";
import ChangeNickname from 'components/User/Profile/ChangeNickname';
import ChangeLocation from 'components/User/Profile/ChangeLocation';


const Profile = () => {
  const navigate = useNavigate();

  // const [isEditingPic, setIsEditingPic] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState(0);


  // 회원정보 출력
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `/api/users/${userId}`,
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setNickname(res.data.nickname);
  //     setProfilePic(res.data.profilePic);
  //     setLocations(res.data.locations);
  //     setLocation(res.data.location.split('')[0]);
  //     setDetailedLocation(res.data.location.split('')[1]);
  //   })
  //   .catch((err) => console.log(err))
  // }, []);


  // 비밀번호 변경 페이지로 이동
  const goChangePassword = () => {
    navigate('/changePassword');
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
            <SelectProfile profilePic={profilePic} setProfilePic={setProfilePic} />
          </Grid>
          <Grid container item xs={6}  sx={{ ml: 2, justifyContent: 'center', alignItems: 'center' }}>
            <ChangeNickname />
          </Grid>
        </Grid>
        <ChangeLocation />
        <Stack spacing={2}>
          {/* <Button variant="contained">비밀번호 수정</Button>  */}
          {/* <Button variant="contained">로그아웃</Button> 
          <Button variant="contained">회원탈퇴</Button>  */}
          <Button
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                marginTop: "30px",
                width: "300px",
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
                borderRadius: 31.5,
              }}
              disableElevation={true}
              size="large"
              variant="contained"
            >
              로그아웃
            </Button>
            <Button
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                marginTop: "30px",
                width: "300px",
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
