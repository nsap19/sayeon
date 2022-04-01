import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import ChangePassword from "./components/User/Profile/ChangePassword";
import DeleteAccount from "components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";
import Profile from "./pages/User/Profile";
import StoryList from "./pages/StoryList/StoryList";
import StoryTalkList from "./pages/StoryTalk/StoryTalkList";
import StoryTalk from "pages/StoryTalk/StoryTalk";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthRoute from "AuthRoute";
import NotFound from "pages/Main/NotFound";

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
          <Route path="/story-list" element={<StoryList />}></Route>
          <Route path="/story-talk-list" element={<StoryTalkList />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route
            path="/story-talk/:userNickname"
            element={
              <StoryTalk
                firstId={"e4738614-cc21-41ed-8ba0-6c1bd2501083"}
                secondId={"de9322ee-03bb-47e3-8f7a-9c38dc3d59bb"}
              />
            }
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<CreateStory />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/story-list" element={<StoryList />}></Route>
        <Route path="/story-talk-list" element={<StoryTalkList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <BottomNavbar />
    </ThemeProvider>
  );
}

export default App;
