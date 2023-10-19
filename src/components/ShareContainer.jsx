import React, { useEffect, useState } from "react";

import "../assets/styles/component/ShareContainer.scss";

import { BsWhatsapp, BsCheck2 } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
// import { FiInstagram } from "react-icons/fi";
import { IoMdLink } from "react-icons/io";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

const ShareContainer = () => {
  const url = window.location.href;
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    () => clearTimeout(timer);
  }, [showTooltip]);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setShowTooltip(true);
  };

  return (
    <div className="icons">
      <FacebookShareButton url={url}>
        <div className="icon">
          <FaFacebookF />
        </div>
      </FacebookShareButton>

      <WhatsappShareButton url={url}>
        <div className="icon">
          <BsWhatsapp />
        </div>
      </WhatsappShareButton>

      <TwitterShareButton url={url}>
        <div className="icon">
          <RiTwitterXLine />
        </div>
      </TwitterShareButton>

      <button type="button" className="icon btn_sec" onClick={copyLink}>
        {showTooltip ? <BsCheck2 /> : <IoMdLink />}
        {showTooltip && <div className="tooltip">Copied to clipboard</div>}
      </button>
    </div>
  );
};

export default ShareContainer;
