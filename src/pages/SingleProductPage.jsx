import React, { useState } from "react";

import "../assets/styles/pages/SingleProductPage.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import ProductCard from "../components/ProductCard";
import ColourRadioBtn from "../components/ColourRadioBtn";
import RadioBtn from "../components/RadioBtn";
import useClickOutiside from "../hooks/use-clickOutside";

const sizes = [
  { title: "Small (S)", value: "Small" },
  { title: "Medium (M)", value: "Medium" },
  { title: "Large (L)", value: "Large" },
  { title: "Extra Large (XL)", value: "Extra Large" },
  { title: "Extra-Extra Large (XXL)", value: "Ultra Large" },
];

const SingleProductPage = () => {
  //   ===================== INITIALIZERS ==========================
  const navigate = useNavigate();
  const { id } = useParams();

  //   ===================== CLOSE DROPDOWN ==========================
  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref,
  } = useClickOutiside(false);

  //   ===================== STATES ==========================
  const [selectedSize, setSelectedSize] = useState("Medium (M)");
  const [selectedColour, setSelectedColour] = useState("#6EE7B7");

  //   ===================== NAVIGATE BACK TO THE PREVIOUS PAGE ==========================
  const navigationHandler = () => {
    navigate("/products");
  };

  //   console.log(selectedSize.split(" ")[0]);

  return (
    <section className="single_product-page">
      <div className="back_container">
        <button type="button" className="prev_btn" onClick={navigationHandler}>
          <AiOutlineArrowLeft /> Back
        </button>
      </div>

      <div className="product_display">
        <div className="product_display_left">
          <div className="image_carousel">
            <div className="image_preview">
              <img src={image1} alt="cloth only" />
              <img src={image2} alt="cloth on model" />

              <img src={image1} alt="cloth only" />
              <img src={image2} alt="cloth on model" />

              <img src={image1} alt="cloth only" />
              <img src={image2} alt="cloth on model" />
            </div>
          </div>
          <div className="image_pagination">
            <button type="button" className="pagination_btn">
              <AiOutlineArrowLeft size={25} />
            </button>
            <div className="paginators">1</div>
            <button type="button" className="pagination_btn">
              <AiOutlineArrowRight size={25} />
            </button>
          </div>
        </div>
        <div className="product_display_right">
          <p className="collection">Atlas collection</p>
          <div className="item">
            <p className="item_name">Black Sweatshirt</p>
            <p className="item_price">₦60 000</p>
          </div>
          <div className="color_btns">
            <ColourRadioBtn
              colour="#6EE7B7"
              changeHandler={() => setSelectedSize("#6EE7B7")}
              checked={selectedColour === "#6EE7B7"}
            />
            <ColourRadioBtn
              colour="#FCD34D"
              changeHandler={() => setSelectedSize("#FCD34D")}
              checked={selectedColour === "#FCD34D"}
            />
            <ColourRadioBtn
              colour="#64748B"
              changeHandler={() => setSelectedSize("#64748B")}
              checked={selectedColour === "#64748B"}
            />
          </div>
          <div className="size_container" ref={ref}>
            <div
              className={`preference_box ${showOptions && "open"}`}
              onClick={() => setShowOptions((prev) => !prev)}
            >
              <p>{selectedSize}</p> <FaChevronDown />
            </div>
            {showOptions && (
              <div className="preference_select">
                {sizes.map((size) => (
                  <RadioBtn
                    name="sizes"
                    value={size.value}
                    title={size.title}
                    key={size.title}
                    changeHandler={() => setSelectedSize(size.title)}
                    checked={selectedSize === size.title}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="cta_btns">
            <button type="button" className="btn-sec">
              Buy Now
            </button>
            <button type="button" className="btn-pri">
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      <div className="recommend_container">
        <p className="recommend_container__heading">Recommended for you</p>
        <div className="recommend_items">
          <ProductCard id="10" />
          <ProductCard id="11" />
          <ProductCard id="12" />
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
