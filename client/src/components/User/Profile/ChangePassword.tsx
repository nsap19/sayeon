import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StyledTextField } from "../Register/StyledComponent";
import { ReactComponent as Close } from "../../../assets/icon/close.svg";


interface Props {
  openDialog: boolean;
  setOpenDialog: any;
}

interface changePasswordInput {
  password: string;
  confirmPassword: string;
}

const ChangePassword = (props: Props) => {
  const { control, handleSubmit, watch } = useForm<changePasswordInput>();

  const password = useRef({});
  password.current = watch("password", "");

  const navigate = useNavigate();
  const onSubmit = (data: changePasswordInput) => {
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      url: "userInfo/password",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: data.password,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("비밀번호 변경완료");
        setOpen(true);
        props.setOpenDialog(false);
        navigate("/profile");
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
      <Stack
        direction="column"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertState}
            sx={{ width: "100%" }}
          >
            {alertState === "success"
              ? "비밀번호가 변경되었습니다."
              : null}
          </Alert>
        </Snackbar>

        <Dialog open={props.openDialog} onClose={handleClose} disableScrollLock={ true }>
          <Stack 
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <DialogTitle style={{ marginLeft: "30px"}}>비밀번호 변경</DialogTitle>
            <Close onTouchEnd={() => props.setOpenDialog(false)} />
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack 
                spacing={2} 
                direction="column"
                alignItems="center"
                sx={{ padding: "10px 0" }}
              >
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: "새로운 비밀번호를 입력해주세요.",
                    },
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상 입력해주세요.",
                    },
                    maxLength: {
                      value: 20,
                      message: "비밀번호는 20자 이내로 입력해주세요.",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
                      message: "영소문자, 숫자, 특수문자를 포함해주세요.",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <StyledTextField
                      {...field}
                      label="새 비밀번호"
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
                      label="새 비밀번호 확인"
                      type="password"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message ? fieldState.error.message : " "
                      }
                    />
                  )}
                />
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{ padding: "0px 10px 5px"}}
                >
                  <Button
                    sx={{
                      color: "white",
                      fontFamily: "S-CoreDream-4Regular",
                      marginTop: "10px",
                      width: "250px",
                      height: "50px",
                      borderRadius: 31.5,
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    변경
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Dialog>
      </Stack>
    </>
  );
}

export default ChangePassword;