import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Link, Snackbar, Alert } from "@mui/material";
import Polaroid from "../../components/Story/Polaroid";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface CustomizedState {
  openSnackbar: boolean;
}

const Main: React.FC = () => {
  // 사연 전송 성공시 스낵바
  const location = useLocation();
  const state = location.state as CustomizedState;
  const [snackbar, setSnackbar] = useState(state ? state.openSnackbar : false);
  const [recentStories, setRecentStories] = useState<any[]>([]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const getRecentStories = () => {
    axios
      .get("story-list/received", {
        params: { page: 0, size: 3 },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setRecentStories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecentStories();
  }, []);

  return (
    <>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {"사연이 전송되었습니다."}
        </Alert>
      </Snackbar>

      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ height: "calc(100% - 70px)" }}
      >
        <Logo style={{ width: "60%", height: "auto" }} />

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
            {recentStories && (
              <Link
                href="/story-list"
                underline="none"
                sx={{ fontSize: "14px" }}
              >
                더보기
              </Link>
            )}
          </Stack>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {recentStories ? (
              <Stack
                direction="row"
                justifyContent=""
                alignItems="start"
                spacing={2}
                sx={{ width: "92%", overflowX: "auto", height: "100%" }}
              >
                {recentStories.map((recentStory) => (
                  <Box
                    sx={{ width: "auto", height: "90%" }}
                    key={recentStory.storyId}
                  >
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
              <p
                style={{
                  alignSelf: "center",
                  margin: "0 auto",
                  textAlign: "center",
                  color: "#8c8888",
                  fontSize: "14px",
                }}
              >
                <p>아직 주고 받은 사연이 없습니다.</p>
                <p>지금 바로 사연을 보내보세요!</p>
              </p>
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Main;
