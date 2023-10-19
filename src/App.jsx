import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing/Routing";
import jwtDecode from "jwt-decode";
import ScrollToTop from "./Routing/scrollToTop";
import Context from "./store/context";
import { cartData } from "./data";

function App() {
  //   ===================== STATES ==========================
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(cartData);

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

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const updateCart = (type, id) => {
    const updatedCart = [...cart];

    const productIdx = updatedCart.findIndex((item) => item.id === id);

    if (type === "increase") {
      updatedCart[productIdx].quantity += 1;
      setCart(updatedCart);
    } else {
      updatedCart[productIdx].quantity -= 1;
      setCart(updatedCart);
    }
  };

  return (
    <BrowserRouter>
      <Context>
        <ScrollToTop>
          <Routing />
        </ScrollToTop>
      </Context>
    </BrowserRouter>
  );
}

export default App;
