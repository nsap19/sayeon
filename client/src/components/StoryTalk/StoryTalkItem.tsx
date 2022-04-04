import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
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

export default function StoryTalkItem({ storyTalk, myInfo }: any) {
  console.log(storyTalk, myInfo);
  // STATE
  const navigate = useNavigate();
  const firstId = myInfo.userId;
  const secondId = () => {
    if (firstId === storyTalk[0].senderId) {
      return storyTalk[0].senderId;
    }
    return storyTalk[0].receiverId;
  };
  const [otherUserInfo, setOtherUserInfo] = useState<{
    nickname: string;
    profilePic: number;
  }>();

  // 정보 요청

  const getOtherUserInfo = () => {
    axios
      .get("userInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: secondId(),
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

  useEffect(() => {
    getOtherUserInfo();
  }, []);

  const openStoryTalk = () => {
    navigate("/story-talk/:nickname");
  };

  return (
    <Box>
      <Stack direction="column" alignItems="start">
        <Button
          variant="text"
          sx={{ color: "black" }}
          href="/story-talk/:nickname"
        >
          {otherUserInfo?.profilePic} {otherUserInfo?.nickname}
        </Button>
        <Box
          sx={{
            width: "40%",
            height: "40%",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Stack direction="row" justifyContent="start" spacing={2}>
            {storyTalk.map((story: any) => (
              <div key={story.storyId} onClick={openStoryTalk}>
                <Polaroid
                  imageUrl={story.image}
                  imageType={story.imageType}
                  senderNickname={story.receiverId}
                  dateReceived={story.dateReceived}
                />
              </div>
            ))}
          </Stack>
        </Box>
      </Stack>
      <hr style={{ margin: "10% 5% 10%" }} />
    </Box>
  );
}
