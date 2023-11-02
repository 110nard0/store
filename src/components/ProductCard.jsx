import React from "react";

import "@asset/component/ProductCard.scss";
import image1 from "@images/image1.jpg";
import image2 from "@images/image2.jpg";
import { Link } from "react-router-dom";

const ProductCard = ({ id }) => {
  return (
    <article className="product-card">
      <Link to={`/products/${id}`}>
        <div className="product-card_preview">
          <img src={image1} alt="cloth preview" className="front-img" />
          <img src={image2} alt="cloth preview" className="back-img" />
        </div>

        <p className="category">ATLAS COLLECTION</p>
        <h4 className="product-card_title">Black Sweatshirt</h4>
        <h4 className="product-card_price">₦60 000</h4>
      </Link>
    </article>
  );
};

export default ProductCard;
