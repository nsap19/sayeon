import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/User/Login";
import Password from "./pages/User/Password";
import Register from "./pages/User/Register";
import DeleteAccount from "components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";
import Profile from "./pages/User/Profile";
import StoryList from "./pages/StoryList/StoryList";
import StoryTalkList from "./pages/StoryTalk/StoryTalkList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthRoute from "AuthRoute";
import IsAuthRoute from "IsAuthRoute";
import NotFound from "pages/Main/NotFound";
import Landing from "pages/Landing";
import { useLocation } from "react-router-dom";

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
  components: {
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      },
      styleOverrides: {
        root: {
          bottom: "78px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<AuthRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/send" element={<CreateStory />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/story-list" element={<StoryList />}></Route>
          <Route path="/story-talk" element={<StoryTalkList />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Route>
        <Route path="/" element={<IsAuthRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {location.pathname != "/landing" && <BottomNavbar />}
    </ThemeProvider>
  );
}

export default App;
