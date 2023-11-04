import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import Loader from "@components/Loader.jsx";

// HDR:================ LAZY LOADING ===================
const Layout = lazy(() => import("@routing/Layout.jsx"));
const LoginPage = lazy(() => import("@pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("@pages/RegisterPage.jsx"));
const Reset = lazy(() => import("@pages/Reset.jsx"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword.jsx"));
const ErrorPage = lazy(() => import("@pages/ErrorPage.jsx"));
const SingleProductPage = lazy(() => import("@pages/SingleProductPage.jsx"));
const About = lazy(() => import("@pages/About.jsx"));
const CheckoutPage = lazy(() => import("@pages/CheckoutPage.jsx"));
const CheckoutInfo = lazy(() => import("@pages/comp/CheckoutInfo.jsx"));
const Payment = lazy(() => import("@pages/Payment.jsx"));
const WaitListPage = lazy(() => import("@pages/WaitListPage.jsx"));
const OrderConfirm = lazy(() => import("@pages/comp/OrderConfirm.jsx"));

// HDR: ================== NON LAZY LOAD ===================
import ProtectedRoutes from "@routing/ProtectedRoutes.jsx";
import FeaturesPage from "@pages/FeaturesPage.jsx";
import Cart from "@pages/Cart.jsx";
import LandingPage from "@pages/LandingPage.jsx";
import ProductsPage from "@pages/ProductsPage.jsx";

//HDR: ================ ADMIN/CMS ===================

const AdminLayout = lazy(() => import("@pages/CMS/AdminLayout"));
const DashBoard = lazy(() => import("@pages/CMS/DashBoard"));
const Overview = lazy(() => import("@pages/CMS/Overview"));
const Orders = lazy(() => import("@pages/CMS/orders/Orders"));
const CategoriesCms = lazy(() => import("@pages/CMS/categories/CategoriesCms"));
const Sizes = lazy(() => import("@pages/CMS/sizes/Sizes"));
const SizesForm = lazy(() => import("@pages/CMS/sizes/SizesForm"));
const ColourForm = lazy(() => import("@pages/CMS/colours/ColoursForm"));
const PreferencesForm = lazy(() =>
  import("@pages/CMS/preferences/PreferencesForm")
);
const Preferences = lazy(() => import("@pages/CMS/preferences/Preferences"));
const CategoriesForm = lazy(() =>
  import("@pages/CMS/categories/CategoriesForm")
);
import Colours from "@pages/CMS/colours/Colours";
import ProductsCms from "@pages/CMS/products/ProductsCms";

import Logout from "@routing/Logout";
import AccountsPage from "@pages/AccountsPage";
import AccountProfile from "@pages/comp/AccountProfile";
import AccountSecurity from "@pages/comp/AccountSecurity";
import ProductForm from "../pages/CMS/products/ProductForm";

const Routing = () => {
  // NOTE: Add the loader component fallback
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* NON PROTECTED ROUTES */}
        <Route path="/waitlist" element={<WaitListPage />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="login"
            element={
              <ProtectedRoutes accessBy="unauthenticated">
                <LoginPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoutes accessBy="unauthenticated">
                <RegisterPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoutes accessBy="unauthenticated">
                <ForgotPassword />
              </ProtectedRoutes>
            }
          />
          <Route path="reset" element={<Reset />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          {/* PAGE NOT FOUND */}
          <Route path="*" element={<ErrorPage />} />
        </Route>

        {/*SUB: ====== PROTECTED ROUTES ======= */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="checkout" element={<CheckoutPage />}>
              <Route index element={<CheckoutInfo />} />
              <Route path="order confirmation" element={<OrderConfirm />} />
            </Route>
            <Route path="payment confirmation page" element={<Payment />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="about" element={<About />} />
            <Route path="account" element={<AccountsPage />}>
              <Route index element={<AccountProfile />} />
              <Route path="security" element={<AccountSecurity />} />
            </Route>
          </Route>

          {/* ADMIN CMS */}
          <Route path="admin" element={<AdminLayout />}>
            <Route element={<Overview />}>
              <Route path="" element={<DashBoard />} />
              <Route path="orders" element={<Orders />} />

              <Route path="products">
                <Route index element={<ProductsCms />} />
                <Route path="add new product" element={<ProductForm />} />
              </Route>

              <Route path="preferences">
                <Route index element={<Preferences />} />
                <Route
                  path="add new preference"
                  element={<PreferencesForm />}
                />
              </Route>
              <Route path="categories">
                <Route index element={<CategoriesCms />} />
                <Route path="add new category" element={<CategoriesForm />} />
              </Route>
              <Route path="sizes">
                <Route index element={<Sizes />} />
                <Route path="add new size" element={<SizesForm />} />
              </Route>
              <Route path="colours">
                <Route index element={<Colours />} />
                <Route path="add new colour" element={<ColourForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
