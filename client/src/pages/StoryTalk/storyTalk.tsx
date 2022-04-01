import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import { Button, Box } from "@mui/material";
import Polaroid from "components/Story/Polaroid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [storyTalk, setStoryTalk] = useState<Story[]>([
    {
      storyId: 654,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648541597464_1648521785936_1648520566143_pexels-lisa-fotios-11334018.jpg",
      imageType: "square",
      waiting: 1,
      senderId: "de9322ee-03bb-47e3-8f7a-9c38dc3d59bb",
      receiverId: "e4738614-cc21-41ed-8ba0-6c1bd2501083",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
    {
      storyId: 655,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542644550_image.jpg",
      imageType: "mini",
      waiting: 1,
      senderId: "e4738614-cc21-41ed-8ba0-6c1bd2501083",
      receiverId: "de9322ee-03bb-47e3-8f7a-9c38dc3d59bb",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
    {
      storyId: 656,
      image:
        "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542662844_pexels-chevanon-photography-1108099.jpg",
      imageType: "wide",
      waiting: 1,
      senderId: "de9322ee-03bb-47e3-8f7a-9c38dc3d59bb",
      receiverId: "e4738614-cc21-41ed-8ba0-6c1bd2501083",
      dateSent: "2022-03-29",
      dateReceived: "2022-03-30",
    },
  ]);

  const [userInfo, setUserInfo] = useState<{ id: string; nickname: string }>({
    id: "",
    nickname: "",
  });
  const [otherUserId, setotherUserId] = useState<string>("");
  const [otherUserInfo, setOtherUserInfo] = useState<{
    nickname: string;
    profilePic: number;
  }>();

  const getUserId = () => {
    axios
      .get("userInfo/myinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserInfo({
          id: res.data.data.userId,
          nickname: res.data.data.memberProfile.nickname,
        });
        const otherUserId =
          res.data.data.userId === firstId ? secondId : firstId;
        setotherUserId(otherUserId);
      })
      .catch((err) => console.log(err));
  };

  const getOtherUserInfo = () => {
    console.log(otherUserId);
    axios
      .get("userInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          userId: otherUserId,
        },
      })
      .then((res) => {
        console.log(res);
        setOtherUserInfo({
          nickname: res.data.data.memberProfile.nickname,
          profilePic: res.data.data.memberProfile.profilePic,
        });
      })
      .catch((err) => console.log(err));
  };

  const content = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    content.current?.scrollIntoView({ behavior: "auto" });
  };

  // 대화 내용 요청
  const getStoryTalk = () => {
    axios
      .get(`story-talk/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        console.log(response);
        setStoryTalk(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserId();
    scrollToBottom();

    if (otherUserId) {
      getOtherUserInfo();
      getStoryTalk();
    }
  }, [content, otherUserId]);

  return (
    <>
      <StoryTalkHeaderbar
        headerName={otherUserInfo?.nickname}
        otherUserInfo={otherUserInfo}
        otherUserId={otherUserId}
      />
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
                otherUserId === story.senderId
                  ? "10px auto 10px 10px"
                  : "10px 10px 10px auto",
            }}
          >
            <Polaroid
              imageUrl={story.image}
              imageType={story.imageType}
              senderNickname={
                otherUserId === story.senderId && otherUserInfo && userInfo
                  ? otherUserInfo.nickname
                  : userInfo.nickname
              }
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
            onClick={() =>
              navigate("/send", {
                state: { id: otherUserId, info: otherUserInfo },
              })
            }
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
