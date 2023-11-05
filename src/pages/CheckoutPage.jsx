import React, { useEffect, useMemo, useState } from "react";

import "@asset/pages/CheckoutPage.scss";
import FixedPosition from "@components/FixedPosition";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import CartProductCard from "@components/CartProductCard.jsx";
import { cartContext } from "@store/context.jsx";
import { getPage } from "@utils/helpers";

const CheckoutPage = () => {
  const [subTotal, setSubTotal] = useState(56000);
  const [total, setTotal] = useState(0);
  const [totalAmt, setTotalAmt] = useState(total + subTotal);

  const navigate = useNavigate();

  const location = getPage("/checkout");

  const {
    state: { cart },
  } = cartContext();

  useEffect(() => {
    let tot = cart.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );

    setTotal(tot);
  }, [cart]);

  useMemo(() => {
    let amt = total + subTotal;
    setTotalAmt(new Intl.NumberFormat().format(amt));
  }, [total, subTotal]);

  return (
    <section className="checkout">
      <FixedPosition className="back_container">
        <button
          type="button"
          className="back_btn"
          onClick={() =>
            location === "checkout" ? navigate("/cart") : navigate(".")
          }
        >
          <AiOutlineArrowLeft /> Back
        </button>
      </FixedPosition>

      <div className="checkout_container">
        <div className="left_container">
          <Outlet />
        </div>
        <div className="right_container">
          <p className="right_heading">ORDER SUMMARY</p>

          <div className="orders">
            {cart?.map((product) => (
              <CartProductCard product={product} key={product.id} />
            ))}
          </div>

          <div className="subtotal">
            <div className="product_cost">
              <p className="product_cost_title">PRODUCTS:</p>
              <h5 className="product_cost_price">₦ {total}</h5>
            </div>
            <div className="product_cost">
              <p className="product_cost_title">DELIVERY:</p>
              <h5 className="product_cost_price">₦ {subTotal}</h5>
            </div>
          </div>
          <div className="product_total">
            <p className="product_cost_title">TOTAL:</p>
            <h5 className="product_cost_price">₦ {totalAmt}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
