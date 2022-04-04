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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);


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
        size: 7
      }
    })
    .then((res) => {
      console.log(res)
      console.log(res.data);
      if (res.data.data) {
        var reverseSentImageList = res.data.data.reverse()
        setSentImageList(reverseSentImageList)
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
      <Box sx={{ px: 2, height: 520, overflowY: "scroll", mt: 2 }}>
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
        <Stack spacing={2} direction="row" justifyContent="center" marginTop="10px">
          <Pagination count={Math.ceil(countSentImages/7)} size="small" />
        </Stack>
      </Box>
    </>
  );
};

export default StoryListSent;
