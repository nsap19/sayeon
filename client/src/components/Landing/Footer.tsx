import React from "react";
import { Box, Stack, SvgIcon } from "@mui/material";
import { ReactComponent as Building } from "assets/icon/building.svg";
import { ReactComponent as Mail } from "assets/icon/story-talk-list.svg";
import { ReactComponent as Call } from "assets/icon/call.svg";

const Footer: React.FC = () => {
  return (
    <Stack
      sx={{
        height: "100%",
        backgroundColor: "#8c8888",
        color: "#F9F9F9",
        padding: "50px 20px",
      }}
    >
      <p style={{ fontSize: "18px", fontFamily: "S-CoreDream-4Regular" }}>
        사진으로 연결하다, 사연
      </p>
      <p
        style={{
          fontSize: "14px",
          fontFamily: "S-CoreDream-4Regular",
          marginBottom: "5px",
        }}
      >
        당신의 사연을 보내보세요.
      </p>
      <Box sx={{ fontSize: "12px", margin: "15px 0" }}>
        <p style={{ marginBottom: "3px" }}>CONTACT</p>
        <Stack direction="row" alignItems="center">
          <SvgIcon
            sx={{ width: "14px", marginRight: "3px" }}
            component={Building}
            inheritViewBox
          />
          <span>서울특별시 강남구 테헤란로</span>
        </Stack>
        <Stack direction="row" alignItems="center">
          <SvgIcon
            sx={{ width: "14px", marginRight: "3px" }}
            component={Mail}
            inheritViewBox
          />
          <span>sayeonservice@gmail.com</span>
        </Stack>
        <Stack direction="row" alignItems="center">
          <SvgIcon
            sx={{ width: "14px", marginRight: "3px" }}
            component={Call}
            inheritViewBox
          />
          <span>02-3429-5100</span>
        </Stack>
      </Box>
      <Box sx={{ fontSize: "12px" }}>© 2021 Sayeon, some rights reserved.</Box>
    </Stack>
  );
};

export default Footer;
