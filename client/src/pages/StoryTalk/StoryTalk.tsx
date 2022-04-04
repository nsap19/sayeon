import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import { Button, Box, CircularProgress, Stack } from "@mui/material";
import Polaroid from "components/Story/Polaroid";
import { useNavigate } from "react-router-dom";

interface Story {
  storyId: number;
  image: string;
  imageType: "MINI" | "SQUARE" | "WIDE";
  waiting: number;
  senderId: string;
  receiverId: string;
  dateSent: string;
  dateReceived: string;
}

interface MyInfoType {
  email: string;
  memberProfile: {
    latitude: number;
    location: string;
    longitude: number;
    nickname: string;
    profilePic: number;
  };
  password: string;
  userId: string;
  withdrawal: string;
}

interface OtherUserInfoType {
  id: string;
  nickname: string;
  profilePic: number;
  withdrawal: string;
}

const StoryTalk: React.FC<{
  myInfo: MyInfoType;
  otherUserInfo: OtherUserInfoType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ myInfo, otherUserInfo, setOpen }) => {
  const navigate = useNavigate();
  const [storyTalk, setStoryTalk] = useState<Story[]>([]);

  const imageTypes: ("MINI" | "SQUARE" | "WIDE")[] = ["MINI", "WIDE", "SQUARE"];

  const scrollToBottom = () => {
    document.getElementById("story-talk")!.scrollTop =
      document.getElementById("story-talk")!.scrollHeight;
  };

  const getStoryTalk = () => {
    axios
      .get(`story-talk`, {
        headers: {
          userId: otherUserInfo.id,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        console.log(res);
        res.data.data.conversation.sort(
          (
            a: { dateReceived: string; dateSent: string },
            b: { dateReceived: string; dateSent: string }
          ) =>
            a.dateReceived.localeCompare(b.dateReceived) ||
            a.dateSent.localeCompare(b.dateSent)
        );

        setStoryTalk(res.data.data.conversation);
        scrollToBottom();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStoryTalk();
    scrollToBottom();
  }, [otherUserInfo]);

  return (
    <>
      <StoryTalkHeaderbar
        headerName={otherUserInfo?.nickname}
        otherUserInfo={otherUserInfo}
        otherUserId={otherUserInfo.id}
        setOpen={setOpen}
      />
      <Box
        sx={{
          height: "calc(100% - 70px - 70px)",
          overflowY: "auto",
        }}
        id="story-talk"
      >
        {storyTalk.length ? (
          <>
            {storyTalk.map((story) => (
              <Box
                key={story.storyId}
                sx={{
                  width: "70%",
                  margin:
                    otherUserInfo.id === story.senderId
                      ? "10px auto 10px 10px"
                      : "10px 10px 10px auto",
                }}
              >
                <Polaroid
                  imageUrl={story.image}
                  imageType={imageTypes[parseInt(story.imageType)]}
                  senderNickname={
                    otherUserInfo.id === story.senderId
                      ? otherUserInfo.nickname
                      : myInfo.memberProfile.nickname
                  }
                  dateReceived={story.dateReceived}
                />
              </Box>
            ))}
          </>
        ) : (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100% - 60px )" }}
          >
            <CircularProgress />
          </Stack>
        )}

        <Box sx={{ textAlign: "center", margin: "10px" }}>
          {storyTalk.length && (
            <Button
              href="/send"
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                margin: "5px 0 5px",
                width: "100%",
                height: "50px",
                borderRadius: "15px",
              }}
              disableElevation={true}
              size="large"
              variant="contained"
              onClick={() =>
                navigate("/send", {
                  state: { id: otherUserInfo.id, info: otherUserInfo },
                })
              }
              disabled={
                otherUserInfo?.withdrawal === "Y" ||
                storyTalk.slice(-1)[0].senderId === myInfo.userId
                  ? true
                  : false
              }
            >
              답장하기
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default StoryTalk;
