import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Link } from "@mui/material";
import Polaroid from "../../components/Polaroid/Polaroid";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [recentStories, setRecentStories] = useState<any[]>([""]);

  const getRecentStories = () => {
    axios
      .get("story-list/received", {
        params: { page: 0, size: 3 },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRecentStories(res.data.data.reverse());
      })
      .catch((err) => {
        if (err.response.status === 500) {
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
  };

  useEffect(() => {
    getRecentStories();
  }, []);

  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ height: "calc(100% - 70px)" }}
    >
      <Box sx={{ height: "110px" }}>
        <Logo style={{ width: "60%", height: "auto" }} onClick={onClick} />
      </Box>

      <Box
        sx={{
          width: "80%",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "30px 20px 20px",
        }}
      >
        <div style={{ padding: "40px 40px 15px", textAlign: "center" }}>
          <p>사진으로 전하는 당신의 사연,</p>
          <p>지금 보내보세요.</p>
        </div>
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
          height: "35%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="end"
          sx={{
            width: "85%",
            margin: "10px",
          }}
        >
          <p>최근 받은 사연</p>
          {recentStories.length ? (
            <Link href="/story-list" underline="none" sx={{ fontSize: "14px" }}>
              더보기
            </Link>
          ) : null}
        </Stack>
        <Box
          sx={{
            height: "85%",
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          {recentStories.length ? (
            <Stack
              direction="row"
              justifyContent=""
              alignItems="start"
              spacing={2}
              sx={{ width: "92%", overflowX: "auto", height: "100%" }}
            >
              {recentStories.map((recentStory, index) => (
                <Box sx={{ width: "auto", height: "90%" }} key={index}>
                  <Polaroid
                    imageUrl={recentStory.image}
                    imageType={recentStory.imageType}
                    senderNickname={recentStory.senderNickname}
                    dateReceived={recentStory.dateReceived}
                  />
                </Box>
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                alignSelf: "center",
                margin: "0 auto",
                textAlign: "center",
                color: "#8c8888",
                fontSize: "14px",
              }}
            >
              <p>아직 주고 받은 사연이 없습니다.</p>
              <p>지금 바로 사연을 보내보세요!</p>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default Main;
