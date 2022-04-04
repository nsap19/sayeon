import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import {
  Button,
  Box,
  CircularProgress,
  Stack,
  Fab,
  SvgIcon,
} from "@mui/material";
import Polaroid from "components/Story/Polaroid";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Send } from "assets/icon/send.svg";

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
  setStoryTalkOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ myInfo, otherUserInfo, setOpen, setStoryTalkOpen }) => {
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
        setStoryTalkOpen={setStoryTalkOpen}
      />
      <Box
        sx={{
          height: "calc(100% - 70px)",
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
            sx={{ height: "calc(100% - 70px)" }}
          >
            <CircularProgress />
          </Stack>
        )}
      </Box>

      {storyTalk.length && (
        <Fab
          sx={{
            color: "white",
            position: "fixed",
            bottom: "78px",
            right: "8px",
            boxShadow: "0px 5px 10px rgb(0 0 0 / 10%)",
          }}
          color="primary"
          href="/send"
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
          <SvgIcon component={Send} inheritViewBox />
        </Fab>
      )}
    </>
  );
};

export default StoryTalk;
