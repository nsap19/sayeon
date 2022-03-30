<<<<<<< HEAD
import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> origin/feature/create-story
import Login from "./pages/User/Login";
import StoryTalkList from "./pages/StoryTalk/storyTalkList";
import Register from "./pages/User/Register";
import ChangePassword from "./components/User/Profile/ChangePassword";
import DeleteAccount from "components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";
import Profile from "./pages/User/Profile";
import StoryList from "./pages/StoryList/StoryList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthRoute from "AuthRoute";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A4CCF3",
    },
    secondary: {
      main: "#c8e0f8",
    },
    error: {
      main: "#f3aca4",
    },
    success: {
      main: "#a4f3d3",
    },
    text: {
      primary: "#8c8888",
      // secondary: "#000000",
    },
    background: {
      default: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/send" element={<CreateStory />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/storylist" element={<StoryList />}></Route>
          <Route path="/storyTalkList" element={<StoryTalkList />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
      </Routes>
      <BottomNavbar />
    </ThemeProvider>
  );
}

export default App;
