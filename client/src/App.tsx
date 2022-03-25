import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/User/Register";
// import ChangePassword from "./components/User/Profile/DeleteAccount";
import BottomNavbar from "./components/BottomNavbar";
import Main from "./pages/Main/Main";
import CreateStory from "./pages/Story/CreateStory";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send" element={<CreateStory />} />
      </Routes>
      <BottomNavbar />
    </ThemeProvider>
  );
}

export default App;
