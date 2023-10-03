import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "./protectedRoutes";
import WaitListPage from "../pages/WaitListPage";
import LandingPage from "../pages/LandingPage";
import Layout from "./Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Reset from "../pages/Reset";
import ForgotPassword from "../pages/ForgotPassword";
import ErrorPage from "../pages/ErrorPage";
import SingleProductPage from "../pages/SingleProductPage";
import ProductsPage from "../pages/ProductsPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/waitlist" element={<WaitListPage />} />

      {/* NON PROTECTED ROUTES */}
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/products/:id" element={<SingleProductPage />} />

        {/* PAGE NOT FOUND */}
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
