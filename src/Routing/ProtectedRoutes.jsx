import React from "react";
import { Navigate } from "react-router";
import Layout from "./Layout";

const getUser = true;

const ProtectedRoutes = () => {
  return getUser ? <Layout /> : <Navigate to={"/waitlist"} />;
};

export default ProtectedRoutes;
