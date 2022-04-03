import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import { Button, Box } from "@mui/material";
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

const StoryTalk: React.FC<{ firstId: string; secondId: string }> = ({
  firstId,
  secondId,
}) => {
  const navigate = useNavigate();
  const [storyTalk, setStoryTalk] = useState<Story[]>([]);
  const [userInfo, setUserInfo] = useState<{ id: string; nickname: string }>({
    id: "",
    nickname: "",
  });
  const [otherUserId, setotherUserId] = useState<string>("");
  const [otherUserInfo, setOtherUserInfo] = useState<{
    nickname: string;
    profilePic: number;
  }>();

  const imageTypes: ("MINI" | "SQUARE" | "WIDE")[] = ["MINI", "WIDE", "SQUARE"];

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

  const getStoryTalk = () => {
    axios
      .get(`story-talk`, {
        headers: {
          userId: otherUserId,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        res.data.data.conversation.sort(
          (a: { dateReceived: string }, b: { dateReceived: string }) =>
            a.dateReceived.localeCompare(b.dateReceived)
        );

        setStoryTalk(res.data.data.conversation);
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
          height: "calc(100% - 70px - 70px)",
          overflowY: "auto",
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
              imageType={imageTypes[parseInt(story.imageType)]}
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
