import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Headerbar from "components/Headerbar";
import SelectProfile from "components/User/Register/SelectProfile";
import EmailController from "components/User/Register/EmailController";
import NicknameController from "components/User/Register/NicknameController";
import PasswordContoller from "components/User/Register/PasswordContoller";
import LocationController from "components/User/Register/LocationController";
import { registerInput } from "components/User/Register/types";

const Register: React.FC = () => {
  const { control, trigger, getValues, handleSubmit, watch, resetField } =
    useForm<registerInput>({
      defaultValues: { detailedLocation: "" },
    });

  // 프로필 선택용
  const [profilePic, setProfilePic] = useState(0);

  const navigate = useNavigate();

  const onSubmit = (data: registerInput) => {
    console.log(data);
    axios({
      method: "post",
      url: "/users/signup",
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
        navigate("/", { state: { openSnackbar: true } });
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  // 스낵바 관련
  const [open, setOpen] = useState(false);
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
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {"다시 시도해주세요."}
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
            <EmailController
              control={control}
              trigger={trigger}
              getValues={getValues}
            />
            <NicknameController
              control={control}
              trigger={trigger}
              getValues={getValues}
            />
            <PasswordContoller control={control} watch={watch} />
            <LocationController control={control} resetField={resetField} />

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
