import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headerbar from "../../Headerbar";

interface changePasswordInput {
  password: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<changePasswordInput>();

  const password = useRef({});
  password.current = watch("password", "");

  const navigate = useNavigate();
  const onSubmit = (data: changePasswordInput) => {
    axios({
      method: "put",
      url: "/userInfo/password",
      // headers: {
      //   Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      //   "Content-Type": "application/json",
      // },
      data: {
        password: data.password,
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
    <>
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
            ? "비밀번호가 변경되었습니다."
            : "다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Headerbar headerName={"비밀번호 변경"} />
        <Stack spacing={2}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "새로운 비밀번호를 입력해주세요.",
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
                id="outlined-basic"
                label="새 비밀번호"
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
                id="outlined-basic"
                label="새 비밀번호 확인"
                variant="outlined"
                type="password"
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ? fieldState.error.message : " "
                }
              />
            )}
          />

          <Button type="submit" variant="contained">
            변경
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default ChangePassword;
