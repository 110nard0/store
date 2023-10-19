import { createContext, useContext, useReducer } from "react";
import { cartData } from "../data";
import { cartReducer } from "./reducers";

const CartContext = createContext();

const Context = ({ children }) => {
  // -----------------USEREDUCER HOOK FOR MANAGING ALL STATE OF THE APP----------------------------
  const [state, dispatch] = useReducer(cartReducer, {
    cart: cartData,
  });

  // -----------------ADD ITEM TO BASKET---------------------------------

  const addToBasket = (item, quantity) => {
    if (state.cart.some((p) => p.id === item.id && p.qty === quantity)) {
      alert("Already added to cart");
    } else if (state.cart.some((p) => p.id === item.id && p.qty !== quantity)) {
      dispatch({
        type: "UPDATE_QTY",
        payload: { ...item, qty: quantity },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, qty: quantity },
      });
    }
  };

  // -----------------CONTEXT PROVIDER----------------------------------

  return (
    <CartContext.Provider value={{ state, dispatch, addToBasket }}>
      {children}
    </CartContext.Provider>
  );
};

export default Context;

// -----------------TO USE THE CONTEXT OF THE CONTEXT API(CONTEXT CONSUMER)----------------------------
export const cartContext = () => {
  return useContext(CartContext);
};
