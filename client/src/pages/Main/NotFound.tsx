import React from "react";
import Lottie from "lottie-react";
import NotFoundPolaroid from "assets/json/Lottie/NotFoundPolaroid.json";
import { Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  color: "white",
  fontFamily: "S-CoreDream-4Regular",
  margin: "10px 30px 30px",
});

const NotFound: React.FC = () => {
  const isAuthorized = localStorage.getItem("token");

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
      {isAuthorized ? (
        <>
          <StyledButton
            href="/"
            disableElevation={true}
            size="large"
            variant="contained"
          >
            홈으로 가기
          </StyledButton>
          <StyledButton
            href="/send"
            disableElevation={true}
            size="large"
            variant="contained"
          >
            사연 보내러 가기
          </StyledButton>
        </>
      ) : (
        <StyledButton
          href="/send"
          disableElevation={true}
          size="large"
          variant="contained"
        >
          로그인하러 가기
        </StyledButton>
      )}
    </Stack>
  );
};

export default NotFound;
