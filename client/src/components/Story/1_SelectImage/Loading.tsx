import React from "react";
import { Stack, CircularProgress } from "@mui/material";

const Loading: React.FC<{ keywordsReady: boolean }> = ({ keywordsReady }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ height: "100%" }}
    >
      <CircularProgress />
      <p>키워드 생성중</p>
    </Stack>
  );
};

export default Loading;
