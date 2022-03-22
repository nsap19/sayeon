import React, { useState } from "react";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    axios({
      method: "delete",
      url: "/api/users",
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
    <Stack>
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

      <h1>회원탈퇴</h1>
      <p>정말 탈퇴하시겠습니까?</p>
      <p>삭제된 계정 정보는 복구되지 않습니다.</p>
      <Button variant="contained" onClick={onClick}>
        탈퇴
      </Button>
    </Stack>
  );
};

export default DeleteAccount;
