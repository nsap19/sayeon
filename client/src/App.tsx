import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/User/Register";
import ChangePassword from "./components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Profile from "./pages/User/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <BottomNavbar />
    </>
  );
}

export default App;
