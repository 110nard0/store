import React, { useEffect, useState } from "react";

import "../assets/styles/pages/SingleProductPage.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import ColourRadioBtn from "../components/ColourRadioBtn";
import RadioBtn from "../components/RadioBtn";
import useClickOutiside from "../hooks/use-clickOutside";
import FixedPosition from "../components/FixedPosition";
import ShareContainer from "../components/ShareContainer";
import SingleProductLeft from "./comp/SingleProductLeft";

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

  //   ===================== STATES ==========================
  const [selectedSize, setSelectedSize] = useState("Medium (M)");
  const [selectedColour, setSelectedColour] = useState("#6EE7B7");

  const [showAccordion, setShowAccordion] = useState("");

  const [showShareModal, setShowShareModal] = useState(false);

  //   ===================== CLOSE DROPDOWN ==========================
  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref,
  } = useClickOutiside(false);

  const accordionhandler = (val) => {
    if (val === showAccordion) {
      setShowAccordion("");
    } else {
      setShowAccordion(val);
    }
  };

  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          url: url,
        })
        .then(() => console.log("thanks for sharing"))
        .catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  //   ===================== NAVIGATE BACK TO THE PREVIOUS PAGE ==========================
  const navigationHandler = () => {
    navigate("/products");
  };

  // important do not forget to use
  //   console.log(selectedSize.split(" ")[0]);

  return (
    <section className="single_product-page">
      <FixedPosition className="back_container">
        <button type="button" className="prev_btn" onClick={navigationHandler}>
          <AiOutlineArrowLeft /> Back
        </button>
      </FixedPosition>

      <div className="product_display">
        {/* ########################### LEFT CONTAINER ################################ */}
        <div className="product_display_left">
          <SingleProductLeft />
        </div>

        {/*##########################  RIGHT CONTAINER ############################## */}
        <div className="product_display_right">
          <p className="collection">Atlas collection</p>
          <div className="item">
            <p className="item_name">Black Sweatshirt</p>
            <p className="item_price">₦60 000</p>
          </div>
          <div className="color_btns">
            <ColourRadioBtn
              colour="#6EE7B7"
              changeHandler={() => setSelectedColour("#6EE7B7")}
              checked={selectedColour === "#6EE7B7"}
            />
            <ColourRadioBtn
              colour="#FCD34D"
              changeHandler={() => setSelectedColour("#FCD34D")}
              checked={selectedColour === "#FCD34D"}
            />
            <ColourRadioBtn
              colour="#64748B"
              changeHandler={() => setSelectedColour("#64748B")}
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

          {/* -------------------- ACCORDIONS ----------------- */}
          <div className="accordion">
            <div
              className={`accordion_title ${
                showAccordion === "details" && "open"
              }`}
              onClick={() => accordionhandler("details")}
            >
              Product details <FaChevronDown />
            </div>
            {showAccordion === "details" && (
              <h6 className="accordion_text">
                The Eternal track jacket reinterprets modern sportswear in an
                innovative viscose tricot knit to provide a structured
                silhouette with stretch comfort. The relaxed fit is cropped with
                thinly padded dropped shoulders to contour the frame. An
                embossed Eternal logo is across the back, and the Fear of God
                leather label is stitched at the back collar.
              </h6>
            )}

            <div
              className={`accordion_title ${
                showAccordion === "sizing" && "open"
              }`}
              onClick={() => accordionhandler("sizing")}
            >
              Sizing guide <FaChevronDown />
            </div>
            {showAccordion === "sizing" && (
              <h6 className="accordion_text">
                Check out our sizing guide{" "}
                <Link to="/features" className="size_link">
                  here
                </Link>
              </h6>
            )}
          </div>

          {/* -------------------- SHARING FEATURES ----------------- */}

          <div className="share_container">
            <button type="button" className="share_btn" onClick={shareHandler}>
              <GoShare size={20} /> Share
            </button>

            {showShareModal && (
              <div className="share_modal">
                <ShareContainer />
              </div>
            )}
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
