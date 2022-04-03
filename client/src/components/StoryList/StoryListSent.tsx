import React, { useState, useEffect } from "react";
import Polaroid from "./StoryListPolaroid";
import { Box, ImageList, ImageListItem, Pagination, Stack } from "@mui/material";
import axios from "axios";


interface sentStory {
  storyId: number;
  image: string;
  imageType: "MINI" | "SQUARE" | "WIDE";
  senderId: string;
  senderNickname: string;
}

const StoryListSent: React.FC = () => {
  const [sentImageList, setSentImageList] = useState<sentStory[]>([]);
  const [countSentImages, setCountSentImages] = useState(0);

  useEffect(() => {
    getSentImageList();
    getSentCnt();
  }, []);

  const getSentImageList = () => {
    // 페이지네이션 처리해야-
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: 'story-list/sent',
      headers: {
        Authorization : `Bearer ${token}`
      },
      params: {
        page: 0,
        size: 8
      }
    })
    .then((res) => {
      console.log(res.data.data);
      if (res.data.data) {
        setSentImageList(res.data.data)
      }
    })
    .catch((err) => console.log(err));
  };

  const getSentCnt = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: 'story-list/sent-cnt',
      headers: {
        Authorization : `Bearer ${token}`
      },
    })
    .then((res) => {
      // console.log(res.data.data);
      if (res.data.data) {
        setCountSentImages(res.data.data)
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>보낸 사연</p>
        <p>{countSentImages}</p>
      </Box>
      <Box sx={{ px: 2, height: 480, overflowY: "scroll", mt: 2 }}>
        <ImageList variant="masonry" cols={2} gap={10}>
          {sentImageList.map((item) => (
            <ImageListItem key={item.image}>
              <Polaroid
                imageUrl={`${item.image}`}
                imageType={item.imageType}
                senderNickname={item.senderNickname}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination count={5} size="small" />
      </Stack>
    </>
  );
};

export default StoryListSent;
