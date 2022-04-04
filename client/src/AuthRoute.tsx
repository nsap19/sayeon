import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRoute() {
  const isAuthorized = localStorage.getItem("token");

  return isAuthorized ? <Navigate to="/" /> : <Outlet />;
}
