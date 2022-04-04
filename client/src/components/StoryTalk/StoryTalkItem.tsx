import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { Button, Box, Stack } from "@mui/material";
import StoryTalk from "pages/StoryTalk/StoryTalk";
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

export default function StoryTalkItem({
  storyTalk,
  myInfo,
  storyTalkOpen,
  setStoryTalkOpen,
}: any) {
  // STATE
  const firstId = myInfo.userId;
  const secondId = () => {
    if (firstId === storyTalk[0].senderId) {
      return storyTalk[0].receiverId;
    }
    return storyTalk[0].senderId;
  };
  const [otherUserInfo, setOtherUserInfo] = useState<{
    id: string;
    nickname: string;
    profilePic: number;
    withdrawal: string;
  }>({ id: "", nickname: "", profilePic: 0, withdrawal: "" });
  const [open, setOpen] = useState(false);

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
          id: secondId(),
          nickname: res.data.data.memberProfile.nickname,
          profilePic: res.data.data.memberProfile.profilePic,
          withdrawal: res.data.data.memberProfile.withdrawal,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOtherUserInfo();
  }, []);

  const openStoryTalk = () => {
    setStoryTalkOpen(true);
  };

  return (
    <>
      {!storyTalkOpen ? (
        <Box sx={{ padding: "20px" }}>
          <Stack direction="column" alignItems="start" spacing={2}>
            <div onClick={openStoryTalk}>
              {otherUserInfo && (
                <img
                  src={require(`../../assets/images/profile/Avatars-${otherUserInfo?.profilePic}.png`)}
                  alt="profile pic"
                  style={{ width: "30px", marginRight: "10px" }}
                />
              )}
              {otherUserInfo?.nickname}
            </div>
            <Box
              sx={{
                width: "40%",
                height: "40%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Stack direction="row" justifyContent="start" spacing={2}>
                {storyTalk.map(
                  (story: any) =>
                    otherUserInfo && (
                      <div key={story.storyId} onClick={openStoryTalk}>
                        <Polaroid
                          imageUrl={story.image}
                          imageType={story.imageType}
                          senderNickname={otherUserInfo.nickname}
                          dateReceived={story.dateReceived}
                        />
                      </div>
                    )
                )}
              </Stack>
            </Box>
          </Stack>
          <hr style={{ margin: "7% 5% 7%" }} />
        </Box>
      ) : (
        <StoryTalk
          myInfo={myInfo}
          otherUserInfo={otherUserInfo}
          setOpen={setOpen}
          setStoryTalkOpen={setStoryTalkOpen}
        />
      )}
    </>
  );
}
