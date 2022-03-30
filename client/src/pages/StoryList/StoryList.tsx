import React from "react";
import StoryListReceived from "../../components/StoryList/StoryListReceived";
import StoryListSent from "../../components/StoryList/StoryListSent";
import { Stack, Box } from "@mui/material";
import "./StoryList.css";
import StoryListHeaderbar from "./StoryListHeaderbar"

const StoryList: React.FC = () => {
  const [isActive, setIsActive] = React.useState(true);

  const handleDisabled = () => {
    setIsActive(false)
  };

  const handleActive = () => {
    setIsActive(true)
  };

  return (
    <Stack sx={{ height: "calc(100% - 56px)" }}>
      <header>
        <StoryListHeaderbar headerName={"내 사연함"} />
      </header>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1, bgcolor: 'white' }}>
        <p onClick={handleActive}>보낸 사연함</p>
        <p onClick={handleDisabled}>받은 사연함</p>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
      <Box sx={{ my: 2 }}>
        {isActive ? (
          <StoryListSent />
        ) : (
          <StoryListReceived />
        )}
      </Box>
    </Stack>
  )
}

export default StoryList;