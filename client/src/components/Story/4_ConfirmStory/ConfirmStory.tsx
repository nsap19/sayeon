import React, { useState, useEffect } from "react";
import { selectCreateStory } from "../../../store/createStory";
import { useAppSelector } from "../../../store/hooks";
import Polaroid from "../Polaroid";
import { Box, Stack, Chip, Snackbar, Alert, Divider } from "@mui/material";
import axios from "axios";
import { receiverState } from "../types";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledP, StyledStack } from "../StyledComponent";
import Dove from "assets/images/waiting/dove.png";
import Bike from "assets/images/waiting/bike.png";
import Postbox from "assets/images/waiting/postbox.png";
import DoneDialog from "./DoneDialog";

const ConfirmStory: React.FC<{ receiver: receiverState }> = ({ receiver }) => {
  const { image, selectedKeywords, waiting } =
    useAppSelector(selectCreateStory);

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
            receiverId: "null",
          };
    axios
      .post("story", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDoneDialog(true);
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  const waitingImage = [null, Dove, Postbox, Bike];

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

  const [doneDialog, setDoneDialog] = useState(false);

  const [storyTime, setStoryTime] = useState(0);
  const getStoryTime = () => {
    axios
      .post(
        "story-time",
        { receiverId: receiver.id, waitingId: waiting },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log(res.data.data.split(":"));
        const time = res.data.data.split(":");
        if (30 <= parseInt(time[1])) {
          setStoryTime(parseInt(time[0]) + 1);
        } else setStoryTime(parseInt(time[0]));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (receiver) {
      getStoryTime();
    }
  }, []);

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {"다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <StyledStack>
        <Stack direction="column" alignItems="center" sx={{ width: "320px" }}>
          {receiver ? (
            <StyledP>{receiver.info.nickname}에게 사연보내기</StyledP>
          ) : (
            <StyledP>랜덤 사연보내기</StyledP>
          )}
          <Box sx={{ maxHeight: "250px", margin: "10px" }}>
            <Box sx={{ height: "100%", width: "100%" }}>
              <Polaroid
                imageUrl={image.url}
                imageType={image.type}
                senderNickname={""}
                dateReceived={new Date().toString()}
              />
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: "20px",
              backgroundColor: "white",
              width: "290px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
              margin: "20px",
              padding: "10px 20px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ margin: "10px" }}
            >
              {waiting > 0 ? (
                <>
                  <img
                    style={{ width: "50px" }}
                    src={waitingImage[waiting]}
                    alt="#"
                  />
                  <Stack
                    direction="column"
                    sx={{ textAlign: "left", width: "150px" }}
                  >
                    {storyTime > 0 ? (
                      <>
                        <p style={{ fontSize: "12px" }}>사연이 도착하는데</p>
                        <p style={{ fontSize: "12px" }}>
                          {storyTime}시간이 걸립니다.
                        </p>
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize: "12px" }}>1시간 이내로</p>
                        <p style={{ fontSize: "12px" }}>사연이 전달됩니다.</p>
                      </>
                    )}
                  </Stack>
                </>
              ) : (
                <>
                  <img
                    style={{ width: "50px" }}
                    src={require("../../../assets/images/waiting/letter.png")}
                    alt="#"
                  />
                  <Stack
                    direction="column"
                    sx={{ textAlign: "left", width: "150px" }}
                  >
                    <p style={{ fontSize: "12px" }}>비슷한 사연과 연결되면</p>
                    <p style={{ fontSize: "12px" }}>사연이 전달됩니다.</p>
                  </Stack>
                </>
              )}
            </Stack>

            <Divider sx={{ color: "#8C8888" }}></Divider>
            <Stack direction="row" sx={{ margin: "10px", flexWrap: "wrap" }}>
              {selectedKeywords.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  color="primary"
                  sx={{ margin: "5px", color: "white" }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Box>
          <StyledButton
            variant="contained"
            size="large"
            disableElevation={true}
            onClick={onClick}
          >
            보내기
          </StyledButton>
        </Box>
      </StyledStack>

      <DoneDialog
        setDoneDialog={setDoneDialog}
        doneDialog={doneDialog}
        receiver={receiver}
      />
    </>
  );
};

export default ConfirmStory;
