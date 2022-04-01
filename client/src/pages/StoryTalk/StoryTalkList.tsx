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
        sx={{ height: "calc(100% - 56px - 70px)", padding: "10%" }}
        spacing={15}
      >
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/story-talk/" + senderId}
            >
              닉네임
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Stack direction="row" justifyContent="start" spacing={2}>
              {/* Test */}
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648541597464_1648521785936_1648520566143_pexels-lisa-fotios-11334018.jpg"
                }
                imageType={"square"}
                senderNickname={"일이삼사오육칠팔구십"}
              />
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542644550_image.jpg"
                }
                imageType={"mini"}
                senderNickname={"일이삼사"}
              />
            </Stack>
          </Box>
        </div>
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/story-talk/" + senderId}
            >
              닉네임
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Box
            sx={{
              width: "175%",
              height: "175%",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Stack direction="row" justifyContent="start" spacing={2}>
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542644550_image.jpg"
                }
                imageType={"mini"}
                senderNickname={"일이삼사"}
              />
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542662844_pexels-chevanon-photography-1108099.jpg"
                }
                imageType={"wide"}
                senderNickname={"일이삼사오육칠"}
              />
            </Stack>
          </Box>
        </div>
        <div>
          {/* {showStoryTalkItems} */}
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="text"
              sx={{ color: "black" }}
              href={"/story-talk/" + senderId}
            >
              닉네임
            </Button>
            <More>사연 대화 삭제</More>
          </Stack>
          <Box
            sx={{
              width: "175%",
              height: "175%",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Stack direction="row" justifyContent="start" spacing={2}>
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648542662844_pexels-chevanon-photography-1108099.jpg"
                }
                imageType={"wide"}
                senderNickname={"일이삼사오육칠"}
              />
              <Polaroid
                imageUrl={
                  "https://sayeon.s3.ap-northeast-2.amazonaws.com/upload/1648541597464_1648521785936_1648520566143_pexels-lisa-fotios-11334018.jpg"
                }
                imageType={"square"}
                senderNickname={"일이삼사오육칠팔구십"}
              />
            </Stack>
          </Box>
        </div>
      </Stack>
    </>
  );
}
