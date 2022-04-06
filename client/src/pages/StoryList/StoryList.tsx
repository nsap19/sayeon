import React from "react";
import StoryListReceived from "components/StoryList/StoryListReceived";
import StoryListSent from "components/StoryList/StoryListSent";
import { Stack, Box } from "@mui/material";
import "./StoryList.css";
import StoryListHeaderbar from "components/StoryList/StoryListHeaderbar";

const StoryList: React.FC = () => {
  const [isActive, setIsActive] = React.useState(true);

  const handleDisabled = () => {
    setIsActive(false);
  };

  const handleActive = () => {
    setIsActive(true);
  };

  return (
    <Stack sx={{ height: "calc(100% - 70px)" }}>
      <header>
        <StoryListHeaderbar headerName={"내 사연함"} />
      </header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 0.5,
          bgcolor: "white",
          color: "#8c8888",
        }}
      >
        <p onClick={handleActive}>받은 사연함</p>
        <p onClick={handleDisabled}>보낸 사연함</p>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {isActive ? (
          <>
            <div className="form-list-on" />
            <div className="form-list-off" />
          </>
        ) : (
          <>
            <div className="form-list-off" />
            <div className="form-list-on" />
          </>
        )}
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        sx={{
          flex: "1 1 auto",
          height: "calc(100% - 56px - 100px)",
          overflowY: "auto",
        }}
      >
        <Box sx={{ my: 2 }}>
          {isActive ? <StoryListReceived /> : <StoryListSent />}
        </Box>
      </Stack>
    </Stack>
  );
};

export default StoryList;
