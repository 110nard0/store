import React from "react";

import "../assets/styles/component/QuantityInput.scss";

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
      <p className="quantity_count">{quantity}</p>
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
