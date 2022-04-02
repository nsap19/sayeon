import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { ReactComponent as Edit } from "../../../assets/icon/edit.svg";
// import { ReactComponent as Location } from "../../../assets/icon/location.svg";
import LocationJson from "../../../assets/json/location.json";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Profile.css";

const locationOptions = Object.keys(LocationJson).sort();

const ChangeLocation = () => {
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [detailedLocation, setDetailedLocation] = useState<string>("");
  const [defaultLocation, setDefaultLocation] = useState<string>("");
  const [defaultDetailedLocation, setDefaultDetailedLocation] =
    useState<string>("");

  // 상세주소용
  const [detailedLocationOptions, setDetailedLocationOptions] = useState<
    string[]
  >(Object.keys(LocationJson[
    location as keyof typeof LocationJson
  ]));

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "userInfo/myinfo",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setLocations(res.data.data.memberProfile.location);
        setLocation(res.data.data.memberProfile.location.split(" ")[0]);
        setDefaultLocation(res.data.data.memberProfile.location.split(" ")[0]);
        setDetailedLocation(res.data.data.memberProfile.location.split(" ")[1]);
        setDefaultDetailedLocation(
          res.data.data.memberProfile.location.split(" ")[1]
        );

      setDetailedLocationOptions(Object.keys(LocationJson[
        defaultLocation as keyof typeof LocationJson
      ]));
    })
    .catch((err) => console.log(err));
  }, []);

  const closeEditing = () => {
    setIsEditingLocation(false);
    setLocation(defaultLocation);
    setDetailedLocation(defaultDetailedLocation);
  };

  // 위치 정보 수정
  const locationEditingMode = () => {
    if (!isEditingLocation) {
      return setIsEditingLocation(true);
    }
    setDetailedLocationOptions(Object.keys(LocationJson[
      defaultLocation as keyof typeof LocationJson
    ]));
  };

  // 시/도 부분 수정
  const onChangeLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
    setDetailedLocationOptions(
      Object.keys(LocationJson[
        event.target.value as keyof typeof LocationJson
      ]).sort()
    );
  };

  // 시/군/구 부분 수정
  const onChangeDetailedLocation = (event: SelectChangeEvent) => {
    setDetailedLocation(event.target.value as string);
  };

  const changeLocation = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      url: "userInfo/location",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        location: location + " " + detailedLocation,
      },
    })
      .then(() => {
        console.log("위치 정보 수정 완료");
        setIsEditingLocation(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack>
      <Grid container item xs={12} sx={{ alignItems: "center" }}>
        <Grid item xs={7} marginLeft="10%">
          {isEditingLocation ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">시/도</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="시/도"
                  onChange={onChangeLocation}
                  className="select-custom"
                >
                  {locationOptions &&
                    locationOptions.map((option, index) => {
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
                  value={detailedLocation}
                  onChange={onChangeDetailedLocation}
                  className="select-custom"
                >
                  {detailedLocationOptions && detailedLocationOptions.map((option) => {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                })} */}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <h3>{locations}</h3>
          )}
        </Grid>
        <Grid item xs={3}>
          {isEditingLocation ? (
            <Grid marginY="auto">
              <button className="button-custom" onClick={changeLocation}>
                수정
              </button>
              <button className="button-custom" onClick={closeEditing}>
                취소
              </button>
            </Grid>
          ) : (
            <Edit onClick={locationEditingMode} className="svg-custom" />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChangeLocation;
