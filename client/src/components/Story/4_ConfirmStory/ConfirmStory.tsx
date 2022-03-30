import React from "react";
import { selectCreateStory } from "../../../store/createStory";
import { useAppSelector } from "../../../store/hooks";
import Polaroid from "../Polaroid";
import { Box, Button, Stack, Chip } from "@mui/material";
import axios from "axios";

const ConfirmStory: React.FC = () => {
  const { receiver, image, selectedKeywords, waiting } =
    useAppSelector(selectCreateStory);

  const onClick = () => {
    axios
      .post(
        "story",
        {
          imageType: image.type,
          imageUrl: image.url,
          keyword: selectedKeywords.join(),
          waitingId: 0,
        },
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJxd2VAcXdlLmNvbSIsImlhdCI6MTY0ODU0MDM2NCwiZXhwIjoxNjQ4NTQzOTY0fQ.lW3KIn5-DMyT9EcRfj9LUFhunqCyyQhqDhP-G-nhPyS1IwKyKeu-cl7KBK9bxno_CBcsMwk7HcIzZb_71s7ZZQ`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box sx={{ margin: "10px", width: "100%", height: "100%" }}>
        {receiver ? (
          <p style={{ margin: "10px" }}>{receiver}에게 사연보내기</p>
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
          {waiting && (
            <Box>
              <p>선택한 시간 | {waiting}</p>
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
