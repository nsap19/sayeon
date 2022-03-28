import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function StoryTalk() {
  // STATE
  const senderId = useParams();
  const [storyTalk, setStoryTalk] = useState();

  // 대화 내용 요청
  const getStoryTalk = () => {
    axios
      .get(`/api/story-talk/${senderId}`)
      .then((response: any) => {
        console.log(response);
        setStoryTalk(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // RENDER
  useEffect(() => {
    getStoryTalk();
  }, []);
  return <>{storyTalk}</>;
}
