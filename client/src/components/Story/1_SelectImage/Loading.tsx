import React from "react";
import { Stack, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import Keywords from "assets/json/Lottie/Keywords.json";

const Loading: React.FC<{ keywordsReady: boolean }> = ({ keywordsReady }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ height: "100%" }}
    >
      <Lottie animationData={Keywords} loop={true} style={{ width: "50%" }} />
    </Stack>
  );
};

export default Loading;
