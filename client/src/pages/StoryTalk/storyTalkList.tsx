import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkItem from "../../components/StoryTalk/storyTalkItem";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any[]>();
  const token = localStorage.getItem("token");

  // GET 요청
  const GetStoryTalkList = () => {
    axios
      .get("/story-talk-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        console.log("response: ", response);
        setStoryTalkList(response);
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
    return (
      <li>
        <StoryTalkItem storyTalk={storyTalk} />
      </li>
    );
  });

  return (
    <>
      storyTalkList
      {showStoryTalkItems}
    </>
  );
}
