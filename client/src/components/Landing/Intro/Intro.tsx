import React from "react";
import { Stack, Button, Box, SvgIcon } from "@mui/material";
import Logo from "./Logo";
import { styled } from "@mui/material/styles";
import { useInView } from "react-intersection-observer";
import "./Intro.css";
import { ReactComponent as ArrowDown } from "assets/icon/arrow-down.svg";

const StyledButton = styled(Button)({
  color: "white",
  fontFamily: "S-CoreDream-4Regular",
  margin: "20px",
  width: "250px",
  height: "50px",
  borderRadius: "15px",
});

const Intro: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100vh", overflowX: "hidden" }}
    >
      <Box></Box>
      <Box>
        <Logo />
        <Stack ref={ref} className={inView ? "intro intro--zoom" : "intro"}>
          <Box
            sx={{
              fontSize: "30px",
              color: "#A4CCF3",
              fontFamily: "S-CoreDream-6Bold",
            }}
          >
            <p style={{ fontSize: "26px", fontFamily: "S-CoreDream-6Bold" }}>
              사진으로 전하는
            </p>
            <p style={{ fontSize: "26px", fontFamily: "S-CoreDream-6Bold" }}>
              당신의 사연,
            </p>
            <p>지금 보내보세요.</p>
          </Box>

          <StyledButton
            variant="contained"
            onClick={() => console.log("click")}
            size="large"
            disableElevation={true}
          >
            시작하기
          </StyledButton>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        padding="20px"
        className={"bounce2"}
        sx={{ opacity: inView ? 1 : 0, transition: "opacity 2s" }}
      >
        <SvgIcon component={ArrowDown} inheritViewBox />
        <span>아래로 스크롤</span>
      </Stack>
    </Stack>
  );
};

export default Intro;
