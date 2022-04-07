import React, { useEffect, useState } from "react";
import StoryListReceived from "components/StoryList/StoryListReceived";
import StoryListSent from "components/StoryList/StoryListSent";
import { Stack, Box, CircularProgress } from "@mui/material";
import "./StoryList.css";
import StoryListHeaderbar from "components/StoryList/StoryListHeaderbar";

const StoryList: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [load, setLoad] = useState(true);

  const handleDisabled = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
    setIsActive(false);
  };

  const handleActive = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 500);
    setIsActive(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  return (
    <Stack sx={{ height: "calc(100% - 70px)" }}>
      <header>
        <StoryListHeaderbar headerName={"사연함"} />
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
        justifyContent="start"
        sx={{
          flex: "1 1 auto",
          height: "calc(100% - 70px - 70px - 31px)",
          overflowY: "auto",
        }}
      >
        {load && (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "calc(100% - 70px - 70px - 31px)",
              width: "100%",
              position: "fixed",
              backgroundColor: "#f9f9f9",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        )}
        <Box sx={{ my: 2, height: "100%" }}>
          {isActive ? <StoryListReceived /> : <StoryListSent />}
        </Box>
      </Stack>
    </Stack>
  );
};

export default StoryList;
