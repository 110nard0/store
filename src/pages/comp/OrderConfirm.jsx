import React from "react";

import "@asset/pages/OrderConfirm.scss";

import { PiWarningCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "@store/context.jsx";

const OrderConfirm = () => {
  const {
    state: { info },
  } = cartContext();

  const navigate = useNavigate();

  return (
    <div className="orders">
      <p className="heading">STEP 2 OF 3 - PERSONAL INFORMATION</p>
      <div className="details">
        <div className="details_info">
          <p className="details_info-title">NAME:</p>
          <h5 className="details_info-value">{info.name}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">EMAIL ADDRESS:</p>
          <h5 className="details_info-value">{info.email}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">PHONE NUMBER:</p>
          <h5 className="details_info-value">{info.phone_number}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">STATE:</p>
          <h5 className="details_info-value">{info.state}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">LGA:</p>
          <h5 className="details_info-value">{info.lga}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">ADDRESS:</p>
          <h5 className="details_info-value">{info.address}</h5>
        </div>
        <div className="details_info">
          <p className="details_info-title">IMPACT PROJECT:</p>
          <h5 className="details_info-value">{info.impact}</h5>
        </div>
      </div>

      <div className="disclaimer">
        <div className="disclaimer_icon">
          <PiWarningCircle />
        </div>
        <p className="disclaimer_text">
          Please confirm that the details provided are correct as they cannot be
          changed once submitted. To make changes or fix mistakes,{" "}
          <Link to="/checkout" className="click_link">
            click here.
          </Link>
        </p>
      </div>

      <button
        type="button"
        className="payment_btn"
        onClick={() => navigate("/payment confirmation page")}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderConfirm;
