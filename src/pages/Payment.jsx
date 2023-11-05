import React, { useEffect, useState } from "react";

import "@asset/pages/Payment.scss";
import FixedPosition from "@components/FixedPosition";
import { useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { cartContext } from "@store/context.jsx";
import useClickOutiside from "@hooks/use-clickOutside.js";
import ShareContainer from "../components/ShareContainer";

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

const Payment = () => {
  // HDR:  ===================== INITIALISER ==========================
  const [total, setTotal] = useState(0);
  const {
    visible: showModal,
    setVisible: setShowModal,
    ref: showModalRef,
  } = useClickOutiside(false);

  // NOTE: url is gotten from the backend
  const paymentUrl = "www.trgst/checkout/paystack/order342576/klut";

  const history = useNavigate();
  const {
    state: { cart },
  } = cartContext();

  const {
    visible: showAccordion,
    setVisible: setShowAccordion,
    ref,
  } = useClickOutiside(true);
  // HDR  ===================== ACTION HANDLER ==========================

  // SUB: To calculate the total
  useEffect(() => {
    let tot = cart.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );
    setTotal(new Intl.NumberFormat().format(tot));
  }, [cart]);

  useEffect(() => {
    showModal
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [showModal]);

  // SUB: Share to pay handler
  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          url: paymentUrl,
        })
        .then(() => console.log("thanks for sharing"))
        .catch(console.error);
    } else {
      setShowModal(true);
    }
  };

  // HDR  ===================== JSX ==========================

  return (
    <section className="payment">
      <FixedPosition className="back_container">
        <button
          type="button"
          className="back_btn"
          onClick={() => history("/checkout/order confirmation")}
        >
          <AiOutlineArrowLeft /> Back
        </button>
      </FixedPosition>
      {/* SUB: PAYMENT CONTAINER */}
      <div className="payment_container">
        <p className="heading">STEP 3 OF 3 - PERSONAL INFORMATION</p>
        <div className="payment_container-info">
          <div className="banner">
            <svg
              className="banner_icon"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20.0001 3.33301L6.66675 8.33301V18.483C6.66675 26.8997 12.3501 34.7497 20.0001 36.6663C27.6501 34.7497 33.3334 26.8997 33.3334 18.483V8.33301L20.0001 3.33301ZM30.0001 18.483C30.0001 25.1497 25.7501 31.3163 20.0001 33.1997C14.2501 31.3163 10.0001 25.1663 10.0001 18.483V10.6497L20.0001 6.89967L30.0001 10.6497V18.483Z"
                fill="#34D399"
              />
            </svg>

            <p className="banner_title">
              Thank you for your order. We secure all payments through Paystack.
            </p>
          </div>
          <div className="details_info">
            <p className="details_info-title">ORDER NUMBER:</p>
            <h5 className="details_info-value">3456211</h5>
          </div>
          <div className="details_info">
            <p className="details_info-title">DATE:</p>
            <h5 className="details_info-value">{`${day}/${month}/${year}`}</h5>
          </div>
          <div className="details_info">
            <p className="details_info-title">TOTAL:</p>
            <h5 className="details_info-value">₦ {total}</h5>
          </div>
        </div>

        <div className="buttons">
          <button type="button" className="btn_primary">
            Pay ₦ {total}
          </button>
          <button type="button" className="btn_sec" onClick={shareHandler}>
            Share to pay
          </button>
        </div>

        <div className="accordion" ref={ref}>
          <h3
            className={`accordion_title ${showAccordion && "open"}`}
            onClick={() => setShowAccordion((prev) => !prev)}
          >
            What is share to pay? <FaChevronDown />
          </h3>
          {showAccordion && (
            <p className="accordion_text">
              Share to pay is a service that allows you to share the payment
              link of your order with anyone of your choice and have them pay
              for it via their preferred method.
            </p>
          )}
        </div>
      </div>

      {/* HDR: Share modal */}

      <div className={`modal ${showModal && "show_modal"}`}>
        <div className="modal_container" ref={showModalRef}>
          <div className="modal_content">
            <header className="header">
              <p className="header_heading">Share to pay</p>
              <button
                type="button"
                className="close_btn"
                onClick={() => setShowModal(false)}
              >
                <AiOutlineClose />
              </button>
            </header>
            <textarea
              type="text"
              value="www.trgst/checkout/paystack/order342576/klut"
              readOnly
              className="modal_input"
            />
            <div className="share_container">
              <ShareContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
