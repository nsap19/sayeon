import React from "react";
import Box from "@mui/material/Box";


const StoryListSent: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mx={3}>
        <p>보낸 사연</p>
        {/* 보낸 사연 수 */}
        <p>24</p>
      </Box>
      <Box>
        
      </Box>
    </div>
  )
}

export default StoryListSent;