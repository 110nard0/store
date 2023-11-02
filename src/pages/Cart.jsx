import React, { useEffect, useState } from "react";

import "../assets/styles/pages/Cart.scss";

import { cartContext } from "@store/context.jsx";
import CartProductCard from "@components/CartProductCard.jsx";
import { Link, useNavigate } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

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

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <section className="cart">
      <div className="left_container">
        <p className="cart_heading">All products</p>
        <div className="cart_items">
          {cart.length > 0 ? (
            cart?.map((product) => (
              <CartProductCard product={product} key={product.id} />
            ))
          ) : (
            <div className="empty_cart">
              <PiSmileySad className="empty_sad-icon" />
              <h2 className="empty_cart_heading"> Your bag is empty</h2>
              <h4 className="empty_cart_subheading">
                {" "}
                Continue shopping to add items to your bag
              </h4>
              <Link to="/products" className="continue_shop-btn">
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="right_container">
        <p className="right_heading">BAG TOTAL</p>
        <div className="subtotal">
          <div className="product_cost">
            <p className="product_cost_title">PRODUCTS:</p>
            <h6 className="product_cost_price">₦ {total}</h6>
          </div>
          <div className="product_cost">
            <p className="product_cost_title">DELIVERY COST:</p>
            <h6 className="product_cost_price delivery">
              Calculated at checkout
            </h6>
          </div>
        </div>
        <div className="product_total">
          <p className="product_cost_title">TOTAL:</p>
          <h6 className="product_cost_price">₦ {total}</h6>
        </div>

        <button
          type="button"
          className="checkout_btn"
          onClick={checkoutHandler}
          disabled={cart.length < 1}
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
