import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing/Routing";
import jwtDecode from "jwt-decode";
import ScrollToTop from "./Routing/scrollToTop";

function App() {
  const [user, setUser] = useState(null);

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
    <BrowserRouter>
      <ScrollToTop>
        <Routing />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
