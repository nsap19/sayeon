import React, { useState, useEffect } from "react";
import Polaroid from "./StoryListPolaroid";
import { Box, ImageList, ImageListItem } from "@mui/material";
import axios from "axios";

interface sentStory {
  storyId: number;
  image: string;
  imageType: "SQUARE" | "MINI" | "WIDE";
  waiting: number;
  senderId: string;
  receiverId: string;
  dateSent: string;
  dateReceived: string;
}

const StoryListSent: React.FC = () => {
  const [sentImageList, setSentImageList] = useState<sentStory[]>([]);

  useEffect(() => {
    getSentImageList();
  }, []);

  const getSentImageList = () => {
    // 페이지네이션 처리해야-
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "story-list/sent",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 0,
        size: 10,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setSentImageList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>보낸 사연</p>
        {/* 보낸 사연 수 */}
        <p>24</p>
      </Box>
      <Box sx={{ px: 2, height: 520, overflowY: "scroll", mt: 2 }}>
        <ImageList variant="masonry" cols={2} gap={10}>
          {sentImageList.map((item) => (
            <ImageListItem key={item.image}>
              <Polaroid
                imageUrl={`${item.image}`}
                imageType={item.imageType}
                senderNickname={"발신자 닉네임 6"}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
};

export default StoryListSent;
