import React from "react";
import StoryListReceived from "../../components/StoryList/StoryListReceived";
import StoryListSent from "../../components/StoryList/StoryListSent";
import Box from "@mui/material/Box";
import "./StoryList.css";

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
        <h2>내 사연함</h2>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
        <div>
          {isActive ? (
            <StoryListSent />
          ) : (
            <StoryListReceived />
          )}
        </div>
      </section>
    </div>
  )
}

export default StoryList;