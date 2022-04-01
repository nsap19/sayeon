import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import { ReactComponent as Logo } from "assets/logo/logo.svg";
import { loginInput } from "components/User/Login/types";
import EmailController from "components/User/Login/EmailController";
import PasswordController from "components/User/Login/PasswordController";
import axios from "axios";
import Headerbar from "components/Headerbar";
// import { useAppDispatch } from "store/hooks";
// import { setLoggedUser } from "store/user";

interface CustomizedState {
  openSnackbar: boolean;
}

export default function Login() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [err, setError] = useState({
    hasError: false,
    message: "",
    type: "server",
  });

  const { handleSubmit, control } = useForm<loginInput>();
  const onSubmit: SubmitHandler<loginInput> = async (data) => {
    await axios
      .post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.token;
        // default header
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        // get User date & dispatch
        localStorage.setItem("token", token);
        // dispatch(setLoggedUser(response.data));
        navigate(-1);
      })
      .catch((err) => {
        // console.log("axios err: ", err);
        setError({
          ...err,
          hasError: true,
          message: "",
          type: "server",
        });
      });
  };

  // 회원가입 성공시 스낵바
  const location = useLocation();
  const state = location.state as CustomizedState;
  const [snackbar, setSnackbar] = useState(state ? state.openSnackbar : false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
    setError({
      ...err,
      hasError: false,
    });
  };

  return (
    <>
      <Headerbar headerName={"로그인"} />

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {"회원가입이 완료되었습니다."}
        </Alert>
      </Snackbar>
      <Snackbar
        open={err.hasError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {"이메일과 비밀번호를 확인해주세요."}
        </Alert>
      </Snackbar>

      <Stack
        direction="column"
        justifyContent="center"
        sx={{ height: "calc(100% - 56px - 70px)", textAlign: "center" }}
      >
        <Stack direction="column" alignItems="center">
          <Logo style={{ width: "80%", height: "80%", margin: "0 auto 10%" }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={0}>
              <EmailController control={control} />
              <PasswordController control={control} />
              <Button
                sx={{
                  color: "white",
                  fontFamily: "S-CoreDream-4Regular",
                  width: "300px",
                  borderRadius: 31.5,
                }}
                disableElevation={true}
                size="large"
                variant="contained"
                type="submit"
              >
                로그인
              </Button>
            </Stack>
          </form>
          <Button
            sx={{
              color: "white",
              backgroundColor: "gray",
              fontFamily: "S-CoreDream-4Regular",
              marginTop: "30px",
              width: "300px",
              borderRadius: 31.5,
            }}
            disableElevation={true}
            size="large"
            variant="contained"
            type="button"
            href="/register"
          >
            회원가입
          </Button>
          <Button variant="text" sx={{ color: "black" }} href="/password">
            비밀번호를 잊으셨나요?
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
