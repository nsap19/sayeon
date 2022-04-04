import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { Button, Box, Stack } from "@mui/material";
import StoryTalk from "pages/StoryTalk/StoryTalk";
import Polaroid from "components/Story/Polaroid";
import { ReactComponent as More } from "../../assets/icon/more.svg";

interface Story {
  storyId: number;
  image: string;
  imageType: "square" | "mini" | "wide";
  waiting: number;
  senderId: string;
  receiverId: string;
  dateSent: string;
  dateReceived: string;
}

export default function StoryTalkItem({ storyTalk }: any) {
  // STATE
  const firstId = storyTalk.senderId;
  const secondId = storyTalk.receiverId;
  const [otherUserInfo, setOtherUserInfo] = useState<{
    nickname: string;
    profilePic: number;
  }>();
  const [myStoryTalk, setMyStoryTalk] = useState<Story[]>([]);
  const imageTypes: ("square" | "mini" | "wide")[] = ["mini", "wide", "square"];

  // 정보 요청
  const getOtherUserInfo = () => {
    axios
      .get("userInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: secondId,
        },
      })
      .then((res) => {
        setOtherUserInfo({
          nickname: res.data.data.memberProfile.nickname,
          profilePic: res.data.data.memberProfile.profilePic,
        });
      })
      .catch((err) => console.log(err));
  };

  const getStoryTalk = () => {
    axios
      .get(`story-talk`, {
        headers: {
          userId: secondId,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        res.data.data.conversation.sort(
          (a: { dateReceived: string }, b: { dateReceived: string }) =>
            a.dateReceived.localeCompare(b.dateReceived)
        );

        setMyStoryTalk(res.data.data.conversation);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOtherUserInfo();
    getStoryTalk();
  }, []);

  return (
    <Box>
      <Button
        variant="text"
        sx={{ color: "black" }}
        href="/story-talk/:nickname"
      >
        {otherUserInfo?.profilePic}
        {otherUserInfo?.nickname}
        <Box
          sx={{
            width: "230%",
            height: "230%",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Stack direction="row" justifyContent="start" spacing={2}>
            {myStoryTalk.map((story) => (
              <Box key={story.storyId}>
                <Polaroid
                  imageUrl={story.image}
                  imageType={imageTypes[parseInt(story.imageType)]}
                  senderNickname={secondId}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Button>
      <hr style={{ margin: "10% 5% 10%" }} />
    </Box>
  );
}
