import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartData } from "@data/data.js";
import { cartReducer, cmsReducer } from "@store/reducers.js";
import { sizesData, colourData, preferenceData } from "@data/data";
import { getUser } from "@services";
import { getJwtToken } from "../services";
import setAuthToken from "../utils/setAuthToken";
import { categoryData, productsData } from "../data/data";

const CartContexts = createContext();
const CmsContexts = createContext();
const AuthContexts = createContext();

// HDR: CONTEXTS PROVIDERS

// HDR: Cart context
const CartContextProvider = ({ children }) => {
  // CMT: Reducer
  const [state, dispatch] = useReducer(cartReducer, {
    cart: cartData,
    info: {},
  });

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

  // CMT: Context provider
  return (
    <>
      <CartContexts.Provider value={{ state, dispatch }}>
        {children}
      </CartContexts.Provider>
    </>
  );
};

// HDR: Cms context
const CmsContextProvider = ({ children }) => {
  // CMT: Reducer
  const [state, dispatch] = useReducer(cmsReducer, {
    products: productsData,
    categories: categoryData,
    preferences: preferenceData,
    sizes: sizesData,
    colours: colourData,
    orders: [],
    searchValue: "",
  });

  // CMT: Context provider
  return (
    <CmsContexts.Provider value={{ state, dispatch }}>
      {children}
    </CmsContexts.Provider>
  );
};

// HDR: Auth context
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getJwtToken() ? getJwtToken() : null);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      setUser(jwtUser);
      setAuthToken(getJwtToken());
    } catch (error) {
      return;
    }
  }, []);

  let contextdata = {
    user,
  };

  return (
    <AuthContexts.Provider value={contextdata}>
      {children}
    </AuthContexts.Provider>
  );
};

// HDR: Global Context Provider

const Context = ({ children }) => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <CmsContextProvider>{children}</CmsContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

// HDR: CONTEXTS USERS / CONSUMERS
const cartContext = () => {
  return useContext(CartContexts);
};

const cmsContext = () => {
  return useContext(CmsContexts);
};

const authContext = () => {
  return useContext(AuthContexts);
};

// HDR: EXPORTS
export default Context;
export { cartContext, cmsContext, authContext };
