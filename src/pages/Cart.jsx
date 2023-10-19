import React, { useEffect, useState } from "react";

import "../assets/styles/pages/Cart.scss";

import { cartContext } from "../store/context";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const {
    state: { cart },
  } = cartContext();

  useEffect(() => {
    let tot = cart.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );

    setTotal(new Intl.NumberFormat().format(tot));
  }, [cart]);

  return (
    <section className="cart">
      <div className="left_container">
        <p className="cart_heading">All products</p>
        <div className="cart_items">
          {cart?.map((product) => (
            <CartProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <div className="right_container">
        <h6 className="heading">BAG TOTAL</h6>
        <div className="subtotal">
          <div className="product_cost">
            <h6 className="product_cost_title">PRODUCTS:</h6>
            <p className="product_cost_price">₦ {total}</p>
          </div>
          <div className="product_cost">
            <h6 className="product_cost_title">DELIVERY COST:</h6>
            <p className="product_cost_price delivery">
              Calculated at checkout
            </p>
          </div>
        </div>
        <div className="product_total">
          <h6 className="product_cost_title">TOTAL:</h6>
          <p className="product_cost_price">₦ {total}</p>
        </div>

        <button type="button" className="checkout_btn">
          Proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
