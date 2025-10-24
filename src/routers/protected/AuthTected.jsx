import React from "react";
import { Navigate } from "react-router-dom";

const AuthTected = ({ children }) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (token) return <Navigate to={"/todos"} />;
  return children;
};

export default AuthTected;
