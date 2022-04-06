import React, { useEffect } from "react";
import Intro from "components/Landing/Intro/Intro";
import Content from "components/Landing/Content";
import Footer from "components/Landing/Footer";
import { Box, Fab, SvgIcon } from "@mui/material";
import { ReactComponent as ArrowUp } from "../assets/icon/arrow-up.svg";
import { useInView } from "react-intersection-observer";

const Landing: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const langdingContents = [
    {
      id: 1,
      smallTitle: "사진으로 연결하다",
      title: "사연",
      content:
        "사연은 당신의 이야기를 담은 한 장의 폴라로이드 사진입니다. 사연을 교환해 새로운 펜팔 친구을 찾아보세요.",
      imageUrl: "",
    },
    {
      id: 2,
      smallTitle: "사연 분석",
      title: "사연의 키워드",
      content:
        "당신의 사연에서 AI가 키워드를 추출합니다. 키워드를 통해 사연의 이유를 선택해주세요.",
      imageUrl: "",
    },
    {
      id: 3,
      smallTitle: "사연 교환",
      title: "새로운 펜팔 친구",
      content:
        "같은 키워드에 관심을 보이는 새로운 친구와 사연을 교환해보세요. 상대방은 당신의 사연 외에 그 어떤 정보도 알 수 없습니다. 새로운 친구와 계속 사연을 교환할 수도 있습니다.",
      imageUrl: "",
    },
    {
      id: 4,
      smallTitle: "사연 전송",
      title: "천천히 전하는 사연",
      content:
        "사연은 옛 편지처럼 거리에 따라 전송 시간이 결정됩니다. 사연을 보내는 방법에 따라 천천히 혹은 조금 빠르게 사연을 보내보세요.",
      imageUrl: "",
    },
  ];

  return (
    <>
      <Box ref={ref} sx={{ height: "100vh" }}>
        <Intro />
      </Box>
      {langdingContents.map((landingContent) => (
        <Box
          key={landingContent.id}
          sx={{
            height: "100vh",
            backgroundColor: landingContent.id % 2 ? "#FCFCFC" : "",
          }}
        >
          <Content {...landingContent} />
        </Box>
      ))}
      <Box sx={{ height: "50vh" }}>
        <Footer />
      </Box>
      <Fab
        sx={{
          color: "white",
          position: "fixed",
          bottom: "8px",
          right: "8px",
          boxShadow: "0px 5px 10px rgb(0 0 0 / 10%)",
          "&.Mui-disabled": {
            boxShadow: "0px 5px 10px rgb(0 0 0 / 10%)",
            backgroundColor: "#D1CFCF",
          },
          opacity: inView ? 0 : 1,
          transition: "opacity 0.5s",
        }}
        color="primary"
        size="small"
        onClick={() => window.scrollTo(0, 0)}
      >
        <SvgIcon component={ArrowUp} inheritViewBox />
      </Fab>
    </>
  );
};

export default Landing;
