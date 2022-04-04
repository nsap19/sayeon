import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function IsAuthRoute() {
  const isAuthorized = localStorage.getItem("token");

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
}
