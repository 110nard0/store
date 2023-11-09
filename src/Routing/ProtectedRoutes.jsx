import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "@store/context";

const ProtectedRoutes = ({ children, accessBy = "authenticated" }) => {
  const { user } = authContext();
  const location = useLocation();

  if (accessBy === "unauthenticated") {
    if (!user) {
      return children;
    } else {
      return (window.location = "/");
    }
  } else {
    if (user) {
      return <Outlet />;
    }
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default ProtectedRoutes;
