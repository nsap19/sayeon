import React, { useState } from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import SelectProfile from "../../components/User/Register/SelectProfile";
import Grid from "@mui/material/Grid";
import LocationJson from "../../assets/json/location.json";
import { ReactComponent as Edit } from "../../assets/icon/edit.svg";
import { ReactComponent as Location } from "../../assets/icon/location.svg";
import { Stack, Button, Box, FormControl, MenuItem, Select, InputLabel } from "@mui/material";


const locationOptions = Object.keys(LocationJson).sort();

const Profile = () => {
  // const [isEditingPic, setIsEditingPic] = useState<boolean>(false);
  const [isEditingNickname, setIsEditingNickname] = useState<boolean>(false);
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState(0);

  // 테스트용
  const [nickname, setNickname] = useState<string>('닉네임');
  // const [nickname, setNickname] = useState<string>('');

  // 테스트용
  const [locations, setLocations] = useState<string>('서울특별시 종로구');
  const [location, setLocation] = useState('서울특별시');
  const [detailedLocation, setDetailedLocation] = useState('종로구');

  // 상세주소용
  const [detailedLocationOptions, setDetailedLocationOptions] = useState<
    string[]
  >(LocationJson[
    location as keyof typeof LocationJson
  ].sort());


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

  // 닉네임 수정
  const nicknameEditingMode = () => {
    if (!isEditingNickname) {
      return setIsEditingNickname(true)
    }
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  };

  const changeNickname = () => {
    // 중복 체크 추가해야 -
    axios({
      method: "post",
      url: "/api/users/nickname",
      data: {
        nickname: nickname
      }
    })
    .then(() => {
      console.log('닉네임 변경 완료')
      setIsEditingNickname(false)
    })
    .catch((err) => console.log(err));
  };

  // 위치 정보 수정
  const locationEditingMode = () => {
    if (!isEditingLocation) {
      return setIsEditingLocation(true)
    }
  };

  const onChangeLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string)};


  return (
    <div>
      <header>
        <h1>Profile</h1>
      </header>
      <section>
        <Grid container spacing={2} columns={12} sx={{ mb: 4 }}>
          <Grid container sx={{ justifyContent: 'center' }} item xs={6}>
            <SelectProfile profilePic={profilePic} setProfilePic={setProfilePic} />
          </Grid>
          <Grid item xs={3} sx={{ m: "auto" }}>
            {isEditingNickname ? (
              <input type="text" value={nickname} onChange={(e) => onChangeNickname(e)} />
            ) : (
              <h2>{nickname}</h2>
            )}
          </Grid>
          <Grid item xs={3} sx={{ m: "auto" }}>
            <div>
              {isEditingNickname ? (
                <button onClick={changeNickname}>수정</button>
              ) : (
                <Edit onClick={nicknameEditingMode}/>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1} item xs={12} sx={{ justifyContent: 'center', mb: 4 }}>
          <Grid item sx={{ m: "auto" }}>            
            <Location />
          </Grid>
          <Grid item>
            {isEditingLocation ? (       
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">시/도</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={location}
                    label="Age"
                    onChange={(e) => {
                      // onChange(e.target.value);
                      setDetailedLocationOptions(
                        LocationJson[
                          e.target.value as keyof typeof LocationJson
                        ].sort()
                      );
                    }}
                  >
                    {locationOptions.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">시/군/구</InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="시/도/군"
                    defaultValue={detailedLocation}
                  >
                    {detailedLocationOptions.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                  </Select>
                </FormControl>
              </Box>
            ): (
              <h3>{locations}</h3>
            )}
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            {isEditingLocation ? (
              <button>수정</button>
            ) : (
              <Edit onClick={locationEditingMode}/>
            )}
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <Button variant="contained">비밀번호 수정</Button> 
          <Button variant="contained">로그아웃</Button> 
          <Button variant="contained">회원탈퇴</Button> 
        </Stack>
      </section>
    </div>
  )
}


export default Profile;