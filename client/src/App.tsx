import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/User/Profile";
import StoryList from "./pages/StoryList/StoryList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/storylist" element={<StoryList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
