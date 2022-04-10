import React from "react";
import { Stack } from "@mui/material";
import Lottie from "react-lottie-player";
import Keywords from "assets/json/Lottie/Keywords.json";

const Loading: React.FC = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ height: "100%" }}
    >
      <Lottie
        animationData={Keywords}
        play
        loop={true}
        style={{ width: "50%" }}
      />
    </Stack>
  );
};

export default Loading;
