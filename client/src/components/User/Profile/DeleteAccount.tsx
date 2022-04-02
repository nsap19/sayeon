import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headerbar from "../../Headerbar";
import { StyledTextField } from "../Register/StyledComponent";

interface DeleteAccountInput {
  password: string;
}

const DeleteAccount: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<DeleteAccountInput>();
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: DeleteAccountInput) => {
    const token = localStorage.getItem("token");
    axios
      .delete("userInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password: data.password,
        },
      })

      // axios({
      //   method: "delete",
      //   url: "userInfo",
      //   params: {
      //     password: password
      //   }
      // })
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
      <Headerbar headerName={"회원탈퇴"} />
      <Stack
        direction="column"
        justifyContent="center"
        sx={{ height: "calc(100% - 56px - 70px)" }}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertState}
            sx={{ width: "100%" }}
          >
            {alertState === "success" ? "회원탈퇴" : "다시 시도해주세요."}
          </Alert>
        </Snackbar>

        <Stack direction="column">
          <Stack margin="0 10% 10%">
            <p>정말 탈퇴하시겠습니까?</p>
            <p>삭제된 계정 정보는 복구되지 않습니다.</p>
          </Stack>
          <Stack alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <StyledTextField
                    {...field}
                    label="비밀번호"
                    type="password"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error?.message ? fieldState.error.message : " "
                    }
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  />
                )}
              />
              <Button
                sx={{
                  color: "white",
                  fontFamily: "S-CoreDream-4Regular",
                  width: "300px",
                  borderRadius: 31.5,
                }}
                size="large"
                variant="contained"
                type="submit"
              >
                탈퇴
              </Button>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default DeleteAccount;
