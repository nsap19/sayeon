import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Stack } from "@mui/material";
import Polaroid from "components/Story/Polaroid";

export default function StoryTalkItem({ storyTalk, myInfo }: any) {
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

  return (
    <Box sx={{ height: "200px", margin: "20px 0 5px 20px" }}>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        sx={{ height: "20%", paddingBottom: "10px", marginLeft: "10px" }}
      >
        {otherUserInfo && (
          <img
            src={require(`../../assets/images/profile/Avatar-${otherUserInfo?.profilePic}.svg`)}
            alt="profile pic"
            style={{
              maxHeight: "80px",
              height: "100%",
            }}
          />
        )}
        <span style={{ marginLeft: "10px" }}>{otherUserInfo?.nickname}</span>
      </Stack>
      <Box
        sx={{
          height: "80%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Stack
          sx={{ height: "85%" }}
          direction="row"
          justifyContent="start"
          spacing={2}
        >
          {storyTalk
            .sort(
              (
                a: { dateReceived: string; dateSent: string },
                b: { dateReceived: string; dateSent: string }
              ) =>
                b.dateReceived.localeCompare(a.dateReceived) ||
                b.dateSent.localeCompare(a.dateSent)
            )
            .map(
              (story: any) =>
                otherUserInfo && (
                  <Box sx={{}} key={story.storyId}>
                    <Polaroid
                      imageUrl={story.image}
                      imageType={story.imageType}
                      senderNickname={
                        story.senderId === firstId
                          ? myInfo.memberProfile.nickname
                          : otherUserInfo.nickname
                      }
                      dateReceived={
                        myInfo.userId === story.senderId
                          ? new Date().toString()
                          : story.dateReceived
                      }
                    />
                  </Box>
                )
            )}
        </Stack>
      </Box>
    </Box>
  );
}
