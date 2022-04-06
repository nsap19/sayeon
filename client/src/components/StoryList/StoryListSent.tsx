import React, { useState, useEffect, useCallback } from "react";
import Polaroid from "../Polaroid/StoryListPolaroid";
import {
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import axios from "axios";
import { useInView } from "react-intersection-observer"


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
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const [ref, inView] = useInView()


  const getSentImageList = useCallback(async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params : {
        page : page,
        size : 5
      }
    }

    axios.get('story-list/sent', config)
    .then((res) => {
      // console.log(res.data.data)
      if (res.data.data) {
        setSentImageList([...sentImageList, ...res.data.data]);
      }
    })
    .catch((err) => console.log(err));
    setLoading(false)
  }, [page]);

  useEffect(() => {
    getSentImageList();
  }, [getSentImageList]);

  useEffect(() => {
    getSentCnt();
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])


  const getSentCnt = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "story-list/sent-cnt",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log(res.data.data);
      if (res.data.data) {
        setCountSentImages(res.data.data);
      }
    })
    .catch((err) => console.log(err));
  };

  
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>보낸 사연</p>
        <p>{countSentImages}</p>
      </Box>
      <Box sx={{ 
        px: 2, 
        height: "500px",
        overflowY: "auto", 
        mt: 2 }}
      >
        <ImageList variant="masonry" cols={2} gap={10}>
          {sentImageList.map((item, idx) => (
            <ImageListItem key={idx} ref={ref}>
              {sentImageList.length -1 === idx ? (
                <Polaroid
                  imageUrl={`${item.image}`}
                  imageType={item.imageType}
                  senderNickname={item.senderNickname}
                  dateReceived=''
                />
              ) : (
                <Polaroid
                  imageUrl={`${item.image}`}
                  imageType={item.imageType}
                  senderNickname={item.senderNickname}
                  dateReceived=''
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box>
      </Box>
    </>
  );
};

export default StoryListSent;