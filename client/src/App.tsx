import React from "react";

function App() {
  return (
    <Routes>
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/story-talk/list" element={<StoryTalkList />} />
    </Routes>
  );
}

export default App;
