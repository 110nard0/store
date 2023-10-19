import React from "react";
import image from "../assets/images/image2.jpg";
import { MdDeleteOutline } from "react-icons/md";
import { cartContext } from "../store/context";
import QuantityInput from "./QuantityInput";

const CartProductCard = ({ product }) => {
  const { dispatch } = cartContext();

  const removeFromCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
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
    <div className="cart_item" key={product.id}>
      <img src={image} alt="pic of a model" className="product_image" />
      <div className="product_detail">
        <p className="product_detail__name">{product.title}</p>
        <p className="product_detail__price">₦{product.price}</p>

        <span className="product_detail__preference">Medium(M)/Yellow</span>
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
  );
};

export default CartProductCard;
