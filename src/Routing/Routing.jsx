import React from "react";
import { Route, Routes } from "react-router";

import ProtectedRoutes from "./ProtectedRoutes";
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
import FeaturesPage from "../pages/FeaturesPage";
import About from "../pages/About";
import Cart from "../pages/Cart";

const Routing = () => {
  return (
    <Routes>
      <Route path="/waitlist" Component={WaitListPage} />

      {/* NON PROTECTED ROUTES */}
      <Route Component={Layout}>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset" Component={Reset} />
        <Route path="/products/:id" Component={SingleProductPage} />

        {/* PAGE NOT FOUND */}
        <Route path="*" Component={ErrorPage} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route Component={ProtectedRoutes}>
        <Route path="/" Component={LandingPage} />
        <Route path="/products" Component={ProductsPage} />
        <Route path="/cart" Component={Cart} />
        <Route path="/features" Component={FeaturesPage} />
        <Route path="/about" Component={About} />
      </Route>
    </Routes>
  );
};

export default Routing;
