import React, { useState } from "react";
import axios from "axios";
import { Stack, Grid, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";
import { ReactComponent as Location } from "../../../assets/icon/location.svg";
import LocationJson from "../../../assets/json/location.json";


const locationOptions = Object.keys(LocationJson).sort();

const ChangeLocation: React.FC = () => {
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  // const [locations, setLocations] = useState<string>('');
  // const [location, setLocation] = useState('');
  // const [detailedLocation, setDetailedLocation] = useState('');
  
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

  // 기존 위치 정보 받아오기
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `users/${userId}`,
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setLocations(res.data.locations);
  //     setLocation(res.data.location.split('')[0]);
  //     setDetailedLocation(res.data.location.split('')[1]);
  //   })
  //   .catch((err) => console.log(err))
  // }, []);


  // 위치 정보 수정
  const locationEditingMode = () => {
    if (!isEditingLocation) {
      return setIsEditingLocation(true)
    }
  };

  // 시/도 부분 수정
  const onChangeLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // event.preventDefault();
    setLocation(event.target.value);
    setDetailedLocationOptions(
      LocationJson[
        event.target.value as keyof typeof LocationJson
      ].sort()
    );
  };
  
  // 시/군/구 부분 수정
  const onChangeDetailedLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDetailedLocation(event.target.value as string)};


  return (
    <Stack>
      <Grid container spacing={1} item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid item sx={{ m: "auto" }}>            
          <Location width="30" height="30"/>
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
                  label="시/도"
                  // onChange={onChangeLocation}
                  onChange={(e) => {
                    // onChangeLocation(e);
                    console.log(e)
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
                  label="시/군/구"
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
        <Grid item sx={{ m: "auto", ml: 1 }}>
          {isEditingLocation ? (
            <button>수정</button>
          ) : (
            <Edit onClick={locationEditingMode}/>
          )}
        </Grid>
      </Grid>
    </Stack>
  )
}


export default ChangeLocation;