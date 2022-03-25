import React from "react";
import Polaroid from "../Story/Polaroid";
import { Box, ImageList, ImageListItem } from "@mui/material";


const StoryListReceived: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mx={3}>
        <p>받은 사연</p>
        {/* 받은 사연 수 */}
        <p>24</p>
      </Box>
      <Box>
        <ImageList variant="masonry" cols={2} gap={10}>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"square"}
              senderNickname={"발신자 닉네임 1"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/mini_default.png")}
              imageType={"mini"}
              senderNickname={"발신자 닉네임 2"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/wide_default.png")}
              imageType={"wide"}
              senderNickname={"발신자 닉네임 3"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"square"}
              senderNickname={"발신자 닉네임 4"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/wide_default.png")}
              imageType={"wide"}
              senderNickname={"발신자 닉네임 5"}
            />
          </ImageListItem>
          <ImageListItem>
            <Polaroid
              imageUrl={require("../../assets/images/test/square_default.png")}
              imageType={"square"}
              senderNickname={"발신자 닉네임 6"}
            />
          </ImageListItem>
        </ImageList>
      </Box>
    </div>
  )
}

export default StoryListReceived;