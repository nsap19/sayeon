import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Stack,
  MenuItem,
  Button,
  TextField,
  FormControl,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import LocationJson from "../../assets/json/location.json";
import SelectProfile from "../../components/User/Register/SelectProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headerbar from "../../components/Headerbar";
import EmailInputController from "../../components/User/Register/EmailInputController";
import NicknameInputController from "../../components/User/Register/NicknameInputController";
import { StyledTextField } from "../../components/User/Register/StyledComponent";
import { registerInput } from "../../components/User/Register/types";

const locationOptions = Object.keys(LocationJson).sort();

const Register: React.FC = () => {
  const { control, handleSubmit, watch, resetField } = useForm<registerInput>({
    defaultValues: { detailedLocation: "" },
  });

  // 프로필 선택용
  const [profilePic, setProfilePic] = useState(0);

  // 비밀번호 확인용
  const password = useRef({});
  password.current = watch("password", "");

  // 상세 주소 선택용
  const [detailedLocationOptions, setDetailedLocationOptions] = useState<
    string[]
  >([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  const onSubmit = (data: registerInput) => {
    console.log(data);
    axios({
      method: "post",
      url: "/api/users/signup",
      data: {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        location: data.location + " " + data.detailedLocation,
        profilePic: profilePic,
      },
    })
      .then((res) => {
        console.log(res);
        setOpen(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setAlertState("error");
        setOpen(true);
      });
  };

  // 스낵바 관련
  const [open, setOpen] = useState(false);
  const [alertState, setAlertState] = useState<
    "error" | "info" | "success" | "warning"
  >("success");

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
      <Headerbar headerName={"회원가입"} />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertState}
          sx={{ width: "100%" }}
        >
          {alertState === "success"
            ? "회원가입이 완료되었습니다."
            : "다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <Stack
        direction="column"
        justifyContent="center"
        sx={{ flex: "1 1 auto" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" alignItems="center" spacing={1}>
            <SelectProfile
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
            <EmailInputController control={control} />
            <NicknameInputController control={control} />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "비밀번호를 입력해주세요.",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
                  message:
                    "영소문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.",
                },
              }}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  label="비밀번호"
                  type="password"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ? fieldState.error.message : " "
                  }
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "비밀번호를 다시 입력해주세요.",
                },
                validate: (value) => {
                  if (value !== password.current) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  label="비밀번호 확인"
                  type="password"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ? fieldState.error.message : " "
                  }
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "위치를 선택해주세요.",
                },
              }}
              render={({ field: { onChange }, fieldState }) => (
                <StyledTextField
                  select
                  defaultValue=""
                  label="시/도"
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ? fieldState.error.message : " "
                  }
                  onChange={(e) => {
                    onChange(e.target.value);
                    setDetailedLocationOptions(
                      LocationJson[
                        e.target.value as keyof typeof LocationJson
                      ].sort()
                    );
                    resetField("detailedLocation");
                    setIsDisabled(false);
                  }}
                >
                  {locationOptions.map((option, index) => {
                    return (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </StyledTextField>
              )}
            ></Controller>

            <Controller
              name="detailedLocation"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "위치를 선택해주세요.",
                },
              }}
              render={({ field, fieldState }) => (
                <FormControl>
                  <StyledTextField
                    {...field}
                    select
                    label="시/도/군"
                    disabled={isDisabled}
                    defaultValue=""
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ? fieldState.error.message : " "
                    }
                  >
                    {detailedLocationOptions.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </StyledTextField>
                </FormControl>
              )}
            ></Controller>

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
              type="submit"
            >
              회원가입
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
