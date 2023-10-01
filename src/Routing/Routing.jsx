import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "./protectedRoutes";
import WaitListPage from "../pages/WaitListPage";
import LandingPage from "../pages/LandingPage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Reset from "../pages/Reset";

const Routing = () => {
  return (
    <Routes>
      <Route path="/waitlist" element={<WaitListPage />} />
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<Reset />} />
      </Route>

      {/* protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
