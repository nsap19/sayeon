import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import { Button, Box } from "@mui/material";
import Polaroid from "components/Story/Polaroid";

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

const StoryTalk: React.FC<{ firstId: string; secondId: string }> = ({
  firstId,
  secondId,
}) => {
  // STATE
  const { userNickname } = useParams<{ userNickname: string }>();
  const [storyTalk, setStoryTalk] = useState<Story[]>([
    {
      storyId: 654,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648541597464_1648521785936_1648520566143_pexels-lisa-fotios-11334018.jpg",
      imageType: "square",
      waiting: 1,
      senderId: "123",
      receiverId: "111",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
    {
      storyId: 655,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542644550_image.jpg",
      imageType: "mini",
      waiting: 1,
      senderId: "111",
      receiverId: "123",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
    {
      storyId: 656,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542662844_pexels-chevanon-photography-1108099.jpg",
      imageType: "wide",
      waiting: 1,
      senderId: "123",
      receiverId: "111",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
  ]);

  const [userId, setUserId] = useState<string>("");
  const [otherUserId, setotherUserId] = useState<string>("");
  const [otherUserInfo, setOtherUserInfo] = useState<{
    nickname: string;
    profilePic: number;
  }>();

  const getUserId = () => {
    axios
      .get("userinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const content = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    content.current?.scrollIntoView({ behavior: "auto" });
  };

  // 대화 내용 요청
  const getStoryTalk = () => {
    axios
      .get(`story-talk/${1}`)
      .then((response: any) => {
        console.log(response);
        setStoryTalk(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // RENDER;
  useEffect(() => {
    getUserId();
    scrollToBottom();
  }, [content]);

  return (
    <>
      <StoryTalkHeaderbar headerName={userNickname} />
      <Box
        sx={{
          height: "calc(100% - 56px - 70px)",
          overflowY: "auto",
          padding: "10px 0",
        }}
      >
        {storyTalk.map((story) => (
          <Box
            key={story.storyId}
            sx={{
              width: "70%",
              margin:
                userNickname === story.senderId
                  ? "10px auto 10px 10px"
                  : "10px 10px 10px auto",
            }}
          >
            <Polaroid
              imageUrl={story.image}
              imageType={story.imageType}
              senderNickname={story.senderId}
            />
          </Box>
        ))}
        <Box sx={{ textAlign: "center", margin: "10px" }}>
          <Button
            href="/send"
            sx={{
              color: "white",
              fontFamily: "S-CoreDream-4Regular",
              width: "100%",
              marginTop: "10px",
            }}
            disableElevation={true}
            size="large"
            variant="contained"
          >
            답장하기
          </Button>
        </Box>
        <div ref={content} />
      </Box>
    </>
  );
};

export default StoryTalk;
