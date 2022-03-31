import React from "react";
import Lottie from "lottie-react";
import NotFoundPolaroid from "assets/json/Lottie/NotFoundPolaroid.json";
import { Stack, Button } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: "calc(100% - 56px)", padding: "20px 0 10px" }}
    >
      <Lottie animationData={NotFoundPolaroid} loop={true} />
      <p>찾으시는 페이지가 존재하지 않습니다.</p>
      <Button
        href="/"
        sx={{
          color: "white",
          fontFamily: "S-CoreDream-4Regular",
          margin: "10px 30px 30px",
        }}
        disableElevation={true}
        size="large"
        variant="contained"
      >
        홈으로 가기
      </Button>
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
        사연 보내러 가기
      </Button>
    </Stack>
  );
};

export default NotFound;
