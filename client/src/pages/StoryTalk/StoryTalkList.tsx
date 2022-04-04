import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkItem from "components/StoryTalk/StoryTalkItem";
import { Stack, Button, Box } from "@mui/material";
import { Route, Link } from "react-router-dom";
import Headerbar from "components/Headerbar";

// test
import Polaroid from "components/Story/Polaroid";
import { ReactComponent as More } from "../../assets/icon/more.svg";
import StoryTalk from "pages/StoryTalk/StoryTalk";
import { margin } from "@mui/system";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any[]>();
  const senderId = 1;

  // GET 요청
  const GetStoryTalkList = () => {
    axios
      .get("/story-talk/list")
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
    //   <>
    //   <Headerbar headerName={"사연 대화 목록"} />
    //   <Stack
    //     direction="column"
    //     sx={{ height: "calc(100% - 56px - 70px)", padding: "5%" }}
    //     spacing={17}
    //   >
    //     {showStoryTalkItems}
    //   </Stack>
    // </>
    <>
      <Headerbar headerName={"사연 대화 목록"} />
      <Stack
        direction="column"
        sx={{ height: "calc(100% - 56px - 70px)", padding: "5%" }}
        spacing={17}
      >
        <div>{showStoryTalkItems}</div>
      </Stack>
    </>
  );
}
