import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkItem from "components/StoryTalk/StoryTalkItem";
import { Stack, Box } from "@mui/material";
import Headerbar from "components/Headerbar";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any>();
  const [myInfo, setMyInfo] = useState<any>();
  const [storyTalkOpen, setStoryTalkOpen] = useState(false);

  // GET 요청
  const getStoryTalkList = () => {
    axios
      .get("/story-talk/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setStoryTalkList(response.data.storyTalkList);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getMyInfo = () => {
    axios
      .get("userInfo/myinfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMyInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // RENDER
  useEffect(() => {
    getMyInfo();
    getStoryTalkList();
  }, []);

  const showStoryTalkItems = storyTalkList?.map(
    (storyTalk: any, idx: number) => {
      return (
        <StoryTalkItem
          key={idx}
          storyTalk={storyTalk.storyTalk}
          myInfo={myInfo}
          storyTalkOpen={storyTalkOpen}
          setStoryTalkOpen={setStoryTalkOpen}
        />
      );
    }
  );

  return (
    <>
      {!storyTalkOpen && <Headerbar headerName={"사연 대화 목록"} />}

      <Stack
        direction="column"
        sx={{
          height: storyTalkOpen
            ? "calc(100% - 70px)"
            : "calc(100% - 70px - 70px)",
        }}
        spacing={storyTalkOpen ? 0 : 17}
      >
        {storyTalkList ? (
          showStoryTalkItems
        ) : (
          <Box sx={{ margin: "10% auto" }}>사연 대화가 없습니다</Box>
        )}
      </Stack>
    </>
  );
}
