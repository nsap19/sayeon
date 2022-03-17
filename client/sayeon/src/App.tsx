import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/User/Login";
// import Register from "./pages/User/Register";

function App() {
  return (
    <Routes>
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
