import React, { useState, useEffect } from "react";
import Polaroid from "./StoryListPolaroid";
import axios from "axios";
import { Box, ImageList, ImageListItem } from "@mui/material";

interface receivedStory {
  storyId: number;
  image: string;
  imageType: "MINI" | "SQUARE" | "WIDE";
  waiting: number;
  senderId: string;
  receiverId: string;
  dateSent: string;
  dateReceived: string;
  senderNickname: string;
}

const StoryListReceived: React.FC = () => {
  const [receivedImageList, setReceivedImageList] = useState<receivedStory[]>([]);
  const [countReceivedImages, setCountReceivedImages] = useState(0);

  useEffect(() => {
    getReceivedImageList();
    getReceivedCnt();
  }, []);

  const getReceivedImageList = () => {
    // 페이지네이션 처리해야-
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: 'story-list/received',
      headers: {
        Authorization : `Bearer ${token}`
      },
      params: {
        page: 0,
        size: 8
      }
    })
    .then((res) => {
      // console.log(res.data.data);
      if (res.data.data) {
        setReceivedImageList(res.data.data)
      }
    })
    .catch((err) => console.log(err));
  };

  const getReceivedCnt = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: 'story-list/received-cnt',
      headers: {
        Authorization : `Bearer ${token}`
      },
    })
    .then((res) => {
      // console.log(res.data.data);
      if (res.data.data) {
        setCountReceivedImages(res.data.data)
      }
    })
    .catch((err) => console.log(err));
  }


  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>받은 사연</p>
        <p>{countReceivedImages}</p>
      </Box>
      <Box sx={{ px: 2, height: 520, overflowY: 'scroll', mt: 2 }}>
      <ImageList variant="masonry" cols={2} gap={10}>
          {receivedImageList.map((item) => (
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
      {/* <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination count={5} size="small" />
      </Stack> */}
    </div>
  );
};

export default StoryListReceived;
