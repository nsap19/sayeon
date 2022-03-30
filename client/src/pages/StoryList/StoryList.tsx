import React from "react";
import StoryListReceived from "../../components/StoryList/StoryListReceived";
import StoryListSent from "../../components/StoryList/StoryListSent";
import Box from "@mui/material/Box";
import "./StoryList.css";
import Headerbar from "components/Headerbar";

const StoryList: React.FC = () => {
  const [isActive, setIsActive] = React.useState(true);

  const handleDisabled = () => {
    setIsActive(false)
  };

  const handleActive = () => {
    setIsActive(true)
  };

  return (
    <div>
      <header>
        <Headerbar headerName={"내 사연함"} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3, mb: 1 }}>
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
      </header>
      <section>
        <Box sx={{ my: 2 }}>
          {isActive ? (
            <StoryListSent />
          ) : (
            <StoryListReceived />
          )}
        </Box>
      </section>
    </div>
  )
}

export default StoryList;