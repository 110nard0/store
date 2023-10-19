export const waitlistReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
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
    default:
      return state;
  }
};
