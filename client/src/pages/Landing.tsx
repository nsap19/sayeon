import React, { useEffect } from "react";
import Intro from "components/Landing/Intro/Intro";
import Part2 from "components/Landing/Part2";
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

  return (
    <>
      <Box ref={ref} sx={{ height: "100vh" }}>
        <Intro />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <Part2 />
      </Box>
      <Box sx={{ height: "100vh" }}>
        <Part2 />
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
