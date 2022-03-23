import React from "react";

export default function StoryTalkItem({ storyTalk }: any) {
  return (
    <>
      <div>{storyTalk.story.senderId}</div>
      <div>{storyTalk.story.image}</div>
    </>
  );
}
