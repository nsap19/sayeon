import React, { useEffect, useState } from "react";
import { selectCreateStory } from "../../../store/createStory";
import { useAppSelector } from "../../../store/hooks";
import Polaroid from "../Polaroid";
import { Box, Button, Stack, Chip, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { receiverState } from "../types";
import { useNavigate } from "react-router-dom";

const ConfirmStory: React.FC<{ receiver: receiverState }> = ({ receiver }) => {
  const { image, selectedKeywords, waiting } =
    useAppSelector(selectCreateStory);
  const navigate = useNavigate();

  const onClick = () => {
    const data =
      waiting > 0
        ? {
            imageType: image.type,
            imageUrl: image.url,
            keyword: selectedKeywords.join(),
            waitingId: waiting,
            receiverId: receiver.id,
          }
        : {
            imageType: image.type,
            imageUrl: image.url,
            keyword: selectedKeywords.join(),
            receiverId: null,
          };
    axios
      .post("story", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (receiver) {
          navigate("/story-talk-list", { state: { openSnackbar: true } });
        } else {
          navigate("/", { state: { openSnackbar: true } });
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  const waitingName = ["", "비둘기", "우체국", "자전거"];

  // 스낵바 관련
  const [open, setOpen] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {"다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <Box sx={{ margin: "10px", width: "100%" }}>
        {receiver ? (
          <p style={{ margin: "10px" }}>
            {receiver.info.nickname}에게 사연보내기
          </p>
        ) : (
          <p style={{ margin: "10px" }}>랜덤 사연보내기</p>
        )}
        <Stack direction="column" alignItems="center">
          <Box sx={{ height: "60%", width: "90%", margin: "10px auto 20px" }}>
            <Box sx={{ height: "100%" }}>
              <Polaroid
                imageUrl={image.url}
                imageType={image.type}
                senderNickname={""}
              />
            </Box>
          </Box>
          {waiting > 0 && (
            <Box>
              <p>선택한 시간 | {waitingName[waiting]}</p>
            </Box>
          )}

          <Stack direction="row" justifyContent="center" spacing={1}>
            {selectedKeywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                color="primary"
                sx={{ color: "white" }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Button
          variant="contained"
          size="large"
          disableElevation={true}
          sx={{
            color: "white",
            fontFamily: "S-CoreDream-4Regular",
            margin: "10px 0",
            width: "300px",
            borderRadius: 31.5,
          }}
          onClick={onClick}
        >
          보내기
        </Button>
      </Box>
    </>
  );
};

export default ConfirmStory;
