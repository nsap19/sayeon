import React from "react";
import { Box, Button, Stack, Link } from "@mui/material";
import Polaroid from "../../components/Story/Polaroid";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

const main: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      sx={{ height: "calc(100% - 56px)" }}
    >
      {/* <Box sx={{ height: "15%" }}>
      </Box> */}
      <Logo style={{ width: "100%", height: "15%" }} />
      {/* <img src={"../../assets/logo/logo.svg"} /> */}
      {/* <SvgIcon sx={{ width: "85%" }} component={Logo} inheritViewBox /> */}
      <Box
        sx={{
          width: "85%",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        당신의사진을무작위로 사람들에게보내보세요
        <Button href="/send" variant="contained">
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
          height: "30%",
        }}
      >
        <Box
          sx={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p>최근 받은 사연</p>
          <Link href="/send" underline="none">
            더보기
          </Link>
          {/* <Button href="/send" variant="text">
            더보기
          </Button> */}
        </Box>
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
            sx={{ height: "100%", width: "92%", overflowX: "auto" }}
          >
            <Polaroid
              imageUrl={"square_default.png"}
              imgType={"square"}
              senderNickname={"일이삼사오육칠팔구십"}
            />
            <Polaroid
              imageUrl={"mini_default.png"}
              imgType={"mini"}
              senderNickname={"일이삼사"}
            />
            <Polaroid
              imageUrl={"wide_default.png"}
              imgType={"wide"}
              senderNickname={"일이삼사오육칠"}
            />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default main;
