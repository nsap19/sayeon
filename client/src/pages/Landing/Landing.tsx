import React from "react";
import { Fade } from "react-awesome-reveal";
import { Box, Stack } from "@mui/material";

export default function Landing() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      sx={{ height: "calc(100% - 70px)", textAlign: "center" }}
    >
      <Fade direction="up">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ marginBottom: "30px" }}>
            <p>실제 편지가 도착하듯이</p>
            <p>상대방과 거리에 따라</p>
            <p>편지를 전달해주는 방법에 따라</p>
            <p>편지가 도착하는 시간이 달라집니다.</p>
          </Box>
          <h1>image</h1>
        </Box>
      </Fade>
    </Stack>
  );
}
