import React from "react";

import "@asset/component/CartProductCard.scss";

import image from "@images/image2.jpg";

import { App } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { PiSmileySadBold } from "react-icons/pi";
import { cartContext } from "@store/context.jsx";
import QuantityInput from "@components/QuantityInput.jsx";

const CartProductCard = ({ product }) => {
  const { dispatch } = cartContext();

  const { message, notification } = App.useApp();

  const removeFromCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });

    notification.info({
      message: "REMOVED FROM CART",
      description: `${item.title} removed from cart`,
      // placement: "top",
      icon: (
        <PiSmileySadBold
          style={{
            color: "#f59e0b",
          }}
        />
      ),
    });
  };

  const updateCart = (type, id) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: {
        id: id,
        type: type,
      },
    });
  };

  return (
    <>
      <div className="cart_item" key={product.id}>
        <img src={image} alt="pic of a model" className="product_image" />
        <div className="product_detail">
          <h2 className="product_detail__name">{product.title}</h2>
          <h2 className="product_detail__price">₦{product.price}</h2>

          <h4 className="product_detail__preference">Medium(M)/Yellow</h4>
        </div>
        <div className="product_cta">
          <button
            type="button"
            className="delete_btn"
            onClick={() => removeFromCart(product)}
          >
            <MdDeleteOutline size={30} />
          </button>

          <QuantityInput
            quantity={product.quantity}
            stock={product.stock}
            productId={product.id}
            setQuantity={updateCart}
          />
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
