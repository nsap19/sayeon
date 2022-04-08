import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Headerbar from "components/Headerbar";
import { StyledTextField } from "components/User/Register/StyledComponent";

interface DeleteAccountInput {
  password: string;
}

const DeleteAccount: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<DeleteAccountInput>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: DeleteAccountInput) => {
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      url: "userInfo",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        password: data.password,
      },
    })
      .then((res) => {
        localStorage.removeItem("token");
        setAlertState("success");
        setOpen(true);
        setTimeout(function () {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
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
        sx={{ height: "calc(100% - 70px - 70px)" }}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertState}
            sx={{ width: "100%" }}
          >
            {alertState === "success"
              ? "탈퇴가 완료되었습니다."
              : "비밀번호가 맞지 않습니다."}
          </Alert>
        </Snackbar>

        <Stack direction="column" alignItems="center" justifyContent="center">
          <Stack marginBottom="10%" textAlign="center">
            <p className="p-custom">정말 탈퇴하시겠습니까?</p>
            <p className="p-custom">삭제된 계정은 복구되지 않습니다.</p>
          </Stack>
          <Stack>
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
                    message: "비밀번호가 일치하지 않습니다.",
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
                  marginTop: "20px",
                  width: "250px",
                  height: "50px",
                  borderRadius: 31.5,
                }}
                disableElevation={true}
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
