import React from "react";

import "@asset/component/QuantityInput.scss";

const QuantityInput = ({ quantity, setQuantity, stock, productId }) => {
  return (
    <div className="quantity">
      <button
        className="quantity_input_btn"
        disabled={quantity <= 1}
        onClick={() => {
          setQuantity("decrease", productId);
        }}
      >
        -
      </button>
      <h5 className="quantity_count">{quantity}</h5>
      <button
        className="quantity_input_btn"
        disabled={quantity >= stock}
        onClick={() => {
          setQuantity("increase", productId);
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
