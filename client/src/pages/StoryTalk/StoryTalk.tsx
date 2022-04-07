import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import StoryTalkHeaderbar from "components/StoryTalk/StoryTalkHeaderbar";
import { Box, CircularProgress, Stack, Fab, SvgIcon } from "@mui/material";
import KeywordsPolaroid from "components/Polaroid/KeywordsPolaroid";
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
  keyword: string;
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
  setStoryTalkOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ myInfo, otherUserInfo, setStoryTalkOpen }) => {
  const navigate = useNavigate();
  const [storyTalk, setStoryTalk] = useState<Story[]>([]);

  const imageTypes: ("MINI" | "SQUARE" | "WIDE")[] = ["MINI", "WIDE", "SQUARE"];

  const endRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
        if (err.response.status === 500) {
          localStorage.removeItem("token");
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
  };

  useEffect(() => {
    getStoryTalk();
    scrollToBottom();
  }, [otherUserInfo]);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
        id="story-talk"
      >
        {storyTalk.length > 0 ? (
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
                <KeywordsPolaroid
                  imageUrl={story.image}
                  imageType={imageTypes[parseInt(story.imageType)]}
                  senderNickname={
                    otherUserInfo.id === story.senderId
                      ? otherUserInfo.nickname
                      : myInfo.memberProfile.nickname
                  }
                  dateReceived={
                    myInfo.userId === story.senderId
                      ? new Date().toString()
                      : story.dateReceived
                  }
                  keywords={story.keyword.slice(1, -1).split(",")}
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
        <div ref={endRef} />
      </Box>

      {storyTalk.length > 0 && (
        <Fab
          sx={{
            color: "white",
            position: "fixed",
            bottom: "78px",
            right: "8px",
            boxShadow: "0px 5px 10px rgb(0 0 0 / 10%)",
            "&.Mui-disabled": {
              boxShadow: "0px 5px 10px rgb(0 0 0 / 10%)",
              backgroundColor: "#D1CFCF",
            },
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
