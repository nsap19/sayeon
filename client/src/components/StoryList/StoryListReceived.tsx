import React from "react";
import Box from "@mui/material/Box";


const StoryListReceived: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mx={3}>
        <p>받은 사연</p>
        {/* 받은 사연 수 */}
        <p>24</p>
      </Box>
    </div>
  )
}

export default StoryListReceived;