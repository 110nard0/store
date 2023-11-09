// HDR: Waitlist Reducer
const waitlistReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// HDR: Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id
            ? action.payload.type === "increase"
              ? (c.quantity += 1)
              : (c.quantity -= 1)
            : c.quantity
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    case "ADD_INFO":
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};

// HDR: Cms Reducer
const cmsReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "ADD_SIZE":
      return {
        ...state,
        sizes: [...state.sizes, action.payload],
      };
    case "DELETE_SIZE":
      return {
        ...state,
        sizes: state.sizes.filter((size) => size.key !== action.payload.key),
      };
    case "EDIT_SIZE":
      return {
        ...state,
        sizes: state.sizes.map((size) =>
          size.key === action.payload.key ? action.payload : size
        ),
      };
    case "ADD_COLOUR":
      return {
        ...state,
        colours: [...state.colours, action.payload],
      };
    case "DELETE_COLOUR":
      return {
        ...state,
        colours: state.colours.filter((c) => c.key !== action.payload.key),
      };
    case "EDIT_COLOUR":
      return {
        ...state,
        colours: state.colours.map((clr) =>
          clr.key === action.payload.key ? action.payload : clr
        ),
      };
    case "ADD_PREFERENCE":
      return {
        ...state,
        preferences: [...state.preferences, action.payload],
      };
    case "DELETE_PREFERENCE":
      return {
        ...state,
        preferences: state.preferences.filter(
          (c) => c.key !== action.payload.key
        ),
      };
    case "EDIT_PREFERENCE":
      return {
        ...state,
        preferences: state.preferences.map((c) =>
          c.key === action.payload.key ? action.payload : c
        ),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (c) => c.key !== action.payload.key
        ),
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.key === action.payload.key ? action.payload : c
        ),
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((c) => c.key !== action.payload.key),
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((c) =>
          c.key === action.payload.key ? action.payload : c
        ),
      };
    case "EDIT_SHOW":
      return {
        ...state,
        products: state.products.map((c) =>
          c.key === action.payload.key
            ? { ...action.payload, show: !c.show }
            : c
        ),
      };

    default:
      return state;
  }
};

// HDR: Exports
export { waitlistReducer, cartReducer, cmsReducer };
