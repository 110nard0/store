import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "@routing/Routing.jsx";
import jwtDecode from "jwt-decode";
import ScrollToTop from "@routing/scrollToTop.jsx";
import Context from "@store/context";
import { ConfigProvider, App } from "antd";
import { token } from "./data/antConfig";

function MyApp() {
  //   ===================== STATES ==========================
  const [user, setUser] = useState(null);

  //   ===================== CONFIGURATIONS AND SETTINGS ==========================
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: token,
      }}
    >
      <App>
        <BrowserRouter>
          <Context>
            <ScrollToTop>
              <Routing />
            </ScrollToTop>
          </Context>
        </BrowserRouter>
      </App>
    </ConfigProvider>
  );
}

export default MyApp;
