import React, { useState, useEffect, useCallback } from "react";
import Polaroid from "components/Polaroid/StoryListPolaroid";
import axios from "axios";
import { Box, ImageList, ImageListItem, Stack, Button } from "@mui/material";
import { useInView } from "react-intersection-observer"


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
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  const [ref, inView] = useInView()


  useEffect(() => {
    getReceivedImageList();
    getReceivedCnt();
  }, []);

  const getReceivedImageList = useCallback(async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params : {
        page : page,
        size : 32
      }
    }

    axios.get('story-list/received', config)
    .then((res) => {
      // console.log(res.data.data);
      if (res.data.data) {
        setReceivedImageList([...receivedImageList, ...res.data.data]);
      }
    })
    .catch((err) => console.log(err));
    setLoading(false)
  }, [page]);


  useEffect(() => {
    getReceivedImageList();
  }, [getReceivedImageList]);


  useEffect(() => {
    getReceivedCnt();
  }, []);


  useEffect(() => {
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])


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
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
        <p>받은 사연</p>
        <p>{countReceivedImages}</p>
      </Box>
      <Stack direction="column" justifyContent="center">
        {countReceivedImages ? (
          <Box sx={{ 
            px: 2, 
            height: "500px",
            overflowY: "auto", 
            mt: 2 
          }}>
            <ImageList variant="masonry" cols={2} gap={10}>
              {receivedImageList.map((item, idx) => (
                <ImageListItem key={idx} ref={ref}>
                  {receivedImageList.length -1 === idx ? (
                    <Polaroid
                      imageUrl={`${item.image}`}
                      imageType={item.imageType}
                      senderNickname={item.senderNickname}
                      dateReceived={item.dateReceived}
                    />
                  ) : (
                    <Polaroid
                      imageUrl={`${item.image}`}
                      imageType={item.imageType}
                      senderNickname={item.senderNickname}
                      dateReceived={item.dateReceived}
                    />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          ) : (
          <Stack direction="column" alignItems="center" marginY="50%">
            <p style={{color: "#8c8888", fontSize: "15px"}}>아직 보낸 사연이 없습니다.</p>
            <p style={{color: "#8c8888", fontSize: "15px"}}>지금 바로 사연을 보내보세요.</p>
            <Button
              href="/send"
              sx={{
                color: "white",
                fontFamily: "S-CoreDream-4Regular",
                margin: "10px 30px 30px",
              }}
              disableElevation={true}
              size="large"
              variant="contained"
              >
              사연 보내기
            </Button>
          </Stack>
          )}
      </Stack>
    </>
  );
};

export default StoryListReceived;
