import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryTalkItem from "../../components/StoryTalk/storyTalkItem";

export default function StoryTalkList() {
  // STATE
  const [storyTalkList, setStoryTalkList] = useState<any[]>();

  // GET 요청
  const GetStoryTalkList = () => {
    axios
      .get("/api/story-talk-list")
      .then((response: any) => {
        console.log("response: ", response);
        setStoryTalkList(response);
      })
      .catch((err) => {
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

  return <>{showStoryTalkItems}</>;
}
