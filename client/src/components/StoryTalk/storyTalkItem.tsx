import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { Button } from "@mui/material";
import StoryTalk from "../../pages/StoryTalk/StoryTalk";
import Polaroid from "components/Story/Polaroid";
import { ReactComponent as More } from "../../assets/icon/more.svg";

export default function StoryTalkItem({ storyTalk }: any) {
  // STATE
  const senderId = storyTalk.senderId;

  // 삭제 요청
  const DeleteStoryTalk = async () => {
    await axios
      .post("/request", { requestType: "delete" })
      .then((response: any) => {
        console.log("response: ", response);
        // const senderId = response.data.senderId
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant="text" sx={{ color: "black" }}>
        storyTalk name
      </Button>
      <More onClick={DeleteStoryTalk}>사연 대화 삭제</More>
      <Polaroid
        imageUrl={storyTalk.image}
        imageType="mini"
        senderNickname="sotryTalk.senderId"
      />
      <Route path="/story-talk/:senderId" element={<StoryTalk />} />
    </>
  );
}
