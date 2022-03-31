import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkItem from "components/StoryTalk/StoryTalkItem";
import { Stack, Button } from "@mui/material";
import { Route, Link } from "react-router-dom";
import Headerbar from "components/Headerbar";

// test
import Polaroid from "components/Story/Polaroid";
import { ReactComponent as More } from "../../assets/icon/more.svg";
import StoryTalk from "pages/StoryTalk/StoryTalk";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any[]>();
  const senderId = 1;

  // GET 요청
  const GetStoryTalkList = () => {
    axios
      .get("/story-talk-list")
      .then((response: any) => {
        console.log("response: ", response);
        setStoryTalkList(response.storyTalkList);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // RENDER
  useEffect(() => {
    GetStoryTalkList();
  }, []);

  const showStoryTalkItems = storyTalkList?.map((storyTalk: any) => {
    return <StoryTalkItem storyTalk={storyTalk} />;
  });

  return (
    <>
      <Headerbar headerName={"사연 대화 목록"} />
      <Stack
        direction="column"
        sx={{ height: "calc(100% - 56px)", margin: "30px" }}
        spacing={3}
      >
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/storyTalkList/" + senderId}
            >
              storyTalk name
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Stack direction="row" justifyContent="start" spacing={2}>
            <Polaroid
              imageUrl="1"
              imageType="mini"
              senderNickname="sotryTalk.senderId"
            />
            <Polaroid
              imageUrl="2"
              imageType="mini"
              senderNickname="sotryTalk.senderId"
            />
          </Stack>
        </div>
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/storyTalkList/" + senderId}
            >
              storyTalk name
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Stack direction="row" justifyContent="start" spacing={2}>
            <Polaroid
              imageUrl="1"
              imageType="mini"
              senderNickname="sotryTalk.senderId"
            />
            <Polaroid
              imageUrl="2"
              imageType="square"
              senderNickname="sotryTalk.senderId"
            />
          </Stack>
        </div>
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/storyTalkList/" + senderId}
            >
              storyTalk name
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Stack direction="row" justifyContent="start" spacing={2}>
            <Polaroid
              imageUrl="1"
              imageType="wide"
              senderNickname="sotryTalk.senderId"
            />
            <Polaroid
              imageUrl="2"
              imageType="mini"
              senderNickname="sotryTalk.senderId"
            />
          </Stack>
        </div>
      </Stack>
    </>
  );
}
