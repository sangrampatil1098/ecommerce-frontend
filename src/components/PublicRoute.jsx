import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("userrrr", user);
  return user ? <Navigate to="/" /> : <Outlet/>;
};

export default PublicRoute;
