import React from "react";

import "../assets/styles/component/Footer.scss";
import CustomLogo from "./CustomLogo";
import LinkBtn from "./LinkBtn";

let currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_detail">
        <a href="/" className="logo">
          <CustomLogo />
        </a>
        <p className="copyright">&copy; {currentYear} TRGST</p>
      </div>
      <div className="footer_links">
        <div>
          <h5 className="footer_title">LEGAL</h5>
          <LinkBtn to="" title="Privacy Policy" />
          <LinkBtn to="" title="Terms of use" />
          <LinkBtn to="" title="Shipping" />
          <LinkBtn to="/" title="Refunds and returns" />
        </div>
        <div>
          <h5 className="footer_title">COMPANY</h5>
          <LinkBtn to="/" title="FAQs" />
          <LinkBtn to="/" title="About us" />
          <LinkBtn to="/" title="Contact us" />
        </div>
        <div>
          <h5 className="footer_title">FEATURES</h5>
          <LinkBtn to="/" title="Size guide" />
          <LinkBtn to="/" title="Buy now" />
          <LinkBtn to="/" title="Social impact" />
        </div>
        <div>
          <h5 className="footer_title">SOCIALS</h5>
          <LinkBtn to="/" title="Instagram" />
          <LinkBtn to="/" title="Facebook" />
          <LinkBtn to="/" title="Twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
