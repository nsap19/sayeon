import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button, Box } from "@mui/material";
import { loginInput } from "components/User/Login/types";
import EmailController from "components/User/Login/EmailController";
import axios from "axios";
import Headerbar from "components/Headerbar";

export default function Password() {
  const { handleSubmit, control } = useForm<loginInput>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<loginInput> = async (data) => {
    await axios
      .post("/userInfo/find-password", data)
      .then((response) => {
        console.log(response);
        navigate("/login", {
          state: { openSnackbar: true, content: "password" },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Headerbar headerName={"비밀번호 찾기"} />
      <Stack
        direction="column"
        justifyContent="center"
        sx={{
          height: "calc(100% - 70px - 70px)",
          textAlign: "center",
        }}
      >
        <Stack direction="column" alignItems="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={0.1}>
              <EmailController control={control} />
              <Box sx={{ marginTop: 8 }}>
                <Button
                  sx={{
                    color: "white",
                    fontFamily: "S-CoreDream-4Regular",
                    width: "300px",
                    minHeight: "56px",
                    borderRadius: 31.5,
                    marginTop: "10px",
                  }}
                  disableElevation={true}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  새 비밀번호 발급
                </Button>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  );
}
