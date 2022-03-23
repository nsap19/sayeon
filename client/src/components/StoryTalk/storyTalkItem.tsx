import React from "react";
import axios from "axios";
import { useRadioGroup } from "@mui/material";

export default function StoryTalkItem({ storyTalk }: any) {
  // 삭제 요청
  const DeleteStoryTalk = async () => {
    await axios
      .post("/api/request", { requestId: useRadioGroup, requestType: "delete" })
      .then((response: any) => {
        console.log("response: ", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>{storyTalk.story.senderId}</div>
      <button onClick={DeleteStoryTalk}>사연 대화 삭제</button>
      <div>{storyTalk.story.image}</div>
    </>
  );
}
