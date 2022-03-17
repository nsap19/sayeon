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
} from "@mui/material";
import LocationJson from "../../assets/json/location.json";
import SelectProfile from "../../components/User/Register/SelectProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface registerInput {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  location: string;
  detailedLocation: string;
}

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
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <h1>회원가입</h1>
      <Stack spacing={2}>
        <SelectProfile profilePic={profilePic} setProfilePic={setProfilePic} />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "이메일을 입력해주세요.",
            },
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="이메일"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ? fieldState.error.message : " "
              }
            />
          )}
        />

        <Controller
          name="nickname"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "닉네임을 입력해주세요.",
            },
            maxLength: {
              value: 10,
              message: "닉네임은 10자 이내로 입력해주세요.",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="닉네임"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error?.message ? fieldState.error.message : " "
              }
            />
          )}
        />

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
                "영소문자, 숫자, 특수문자를 포함해 8자 이상으로 입력해주세요.",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="비밀번호"
              variant="outlined"
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
            <TextField
              {...field}
              label="비밀번호 확인"
              variant="outlined"
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
            <TextField
              select
              variant="outlined"
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
            </TextField>
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
              <TextField
                {...field}
                select
                variant="outlined"
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
              </TextField>
            </FormControl>
          )}
        ></Controller>

        <Button type="submit" variant="contained">
          회원가입
        </Button>
      </Stack>
    </form>
  );
};

export default Register;
