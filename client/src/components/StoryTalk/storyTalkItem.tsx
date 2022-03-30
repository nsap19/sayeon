import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import { useRadioGroup } from "@mui/material";
import StoryTalk from "pages/StoryTalk/StoryTalk";

export default function StoryTalkItem({ storyTalk }: any) {
  // 삭제 요청
  const DeleteStoryTalk = async () => {
    await axios
      .post("/api/request", { requestId: useRadioGroup, requestType: "delete" })
      .then((response: any) => {
        console.log("response: ", response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <Link to="/story-talk/{senderId}">{storyTalk.story.senderId}</Link>
      <button onClick={DeleteStoryTalk}>사연 대화 삭제</button>
      <div>{storyTalk.story.image}</div>
      {/* <Route path="/story-talk/:senderId" element={<StoryTalk />} /> */}
    </>
  );
}
