import React from "react";
import NavBar from "@components/NavBar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "@components/Footer.jsx";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
