import React, { useState } from "react";
import { Box, Button, Stack, Link, Snackbar, Alert } from "@mui/material";
import Polaroid from "../../components/Story/Polaroid";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { useLocation } from "react-router-dom";

interface CustomizedState {
  openSnackbar: boolean;
}

const Main: React.FC = () => {
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
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      sx={{ height: "calc(100% - 56px)", padding: "20px 0 10px" }}
    >
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

      {/* <Box sx={{ height: "15%" }}>
      </Box> */}
      <Logo style={{ width: "85%", height: "auto" }} />
      {/* <img src={"../../assets/logo/logo.svg"} /> */}
      {/* <SvgIcon sx={{ width: "85%" }} component={Logo} inheritViewBox /> */}
      <Box
        sx={{
          width: "85%",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ padding: "40px 40px 20px" }}>
          당신의 사연을 사진에 담아 보내고 비슷한 사연을 답장으로 받아보세요.
        </p>
        <Button
          href="/send"
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            margin: "10px 30px 30px",
          }}
          disableElevation={true}
          size="large"
          variant="contained"
        >
          사연 보내기
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "40%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: "85%",
            margin: "10px 0",
          }}
        >
          <p>최근 받은 사연</p>
          <Link href="/story-list" underline="none">
            더보기
          </Link>
          {/* <Button href="/send" variant="text">
            더보기
          </Button> */}
        </Stack>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Stack
            direction="row"
            justifyContent=""
            alignItems="center"
            spacing={2}
            sx={{ width: "92%", overflowX: "auto" }}
          >
            <Polaroid
              imageUrl={
                "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648541597464_1648521785936_1648520566143_pexels-lisa-fotios-11334018.jpg"
              }
              imageType={"square"}
              senderNickname={"일이삼사오육칠팔구십"}
            />
            <Polaroid
              imageUrl={
                "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542644550_image.jpg"
              }
              imageType={"mini"}
              senderNickname={"일이삼사"}
            />
            <Polaroid
              imageUrl={
                "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542662844_pexels-chevanon-photography-1108099.jpg"
              }
              imageType={"wide"}
              senderNickname={"일이삼사오육칠"}
            />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Main;
