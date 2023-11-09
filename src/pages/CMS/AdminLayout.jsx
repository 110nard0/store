import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "@store/context";

const AdminLayout = () => {
  const location = useLocation();
  const { user } = authContext();

  return user && user["is_staff"] ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default AdminLayout;
