import React from "react";

import "../assets/styles/component/ProductCard.scss";
// import image1 from "../assets/styles/images/images1.jpeg";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link to="/products/1" className="product-card">
      <div className="product-card_preview">
        <img src={image1} alt="cloth preview" className="front-img" />
        <img src={image2} alt="cloth preview" className="back-img" />
      </div>

      <p className="category">ATLAS COLLECTION</p>
      <p className="product-card_title">Black Sweatshirt</p>
      <p className="product-card_price">₦60 000</p>
    </Link>
  );
};

export default ProductCard;
