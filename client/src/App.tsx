import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/User/Register";
// import ChangePassword from "./components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";
import Profile from "./pages/User/Profile";
import StoryList from "./pages/StoryList/StoryList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<CreateStory />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/storylist" element={<StoryList />}></Route>
      </Routes>
      <BottomNavbar />
    </>
  );
}

export default App;
