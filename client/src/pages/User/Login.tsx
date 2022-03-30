import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button } from "@mui/material";
import { ReactComponent as Logo } from "assets/logo/logo.svg";
import { loginInput } from "components/User/Login/types";
import EmailController from "components/User/Login/EmailController";
import PasswordController from "components/User/Login/PasswordController";
import axios from "axios";
import Headerbar from "components/Headerbar";
// import { useAppDispatch } from "store/hooks";
// import { setLoggedUser } from "store/user";

export default function Login() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        console.log("axios err: ", err);
      });
  };

  return (
    <Stack direction="column" sx={{ height: "calc(100% - 56px)" }}>
      <Headerbar headerName={"로그인"} />
      <Stack alignItems="center">
        <Logo style={{ width: "50%", height: "50%", margin: "10% 5% 10%" }} />
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
  );
}
