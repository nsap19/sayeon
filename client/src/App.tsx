import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/User/Register";
// import ChangePassword from "./components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<CreateStory />} />
      </Routes>
      <BottomNavbar />
    </>
  );
}

export default App;
