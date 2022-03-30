import React, { useState } from "react";
import { Stack, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Headerbar from "../../Headerbar";


const DeleteAccount: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');

  const onClick = () => {
    console.log(password)
    const token = localStorage.getItem("token")
    axios.delete("userInfo", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        password
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e)
    setPassword(e.target.value)
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
            ? "회원탈퇴"
            : "다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <Headerbar headerName={"회원탈퇴"} />
      <p>정말 탈퇴하시겠습니까?</p>
      <p>삭제된 계정 정보는 복구되지 않습니다.</p>
      <input type="password" value={password} onChange={(e) => handleChange(e)}/>
      <Button variant="contained" onClick={onClick}>
        탈퇴
      </Button>
    </Stack>
  );
};

export default DeleteAccount;
