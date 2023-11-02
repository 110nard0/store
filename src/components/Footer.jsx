import React from "react";

import "@asset/component/Footer.scss";
import CustomLogo from "@components/CustomLogo.jsx";
import LinkBtn from "@components/LinkBtn.jsx";

let currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_detail">
        <a href="/" className="logo">
          <CustomLogo />
        </a>
        <h3 className="copyright">&copy; {currentYear} TRGST</h3>
      </div>
      <div className="footer_links">
        <div>
          <p className="footer_title">LEGAL</p>
          <LinkBtn to="" title="Privacy Policy" />
          <LinkBtn to="" title="Terms of use" />
          <LinkBtn to="" title="Shipping" />
          <LinkBtn to="/" title="Refunds and returns" />
        </div>
        <div>
          <p className="footer_title">COMPANY</p>
          <LinkBtn to="/" title="FAQs" />
          <LinkBtn to="/about" title="About us" />
          <LinkBtn to="/" title="Contact us" />
        </div>
        <div>
          <p className="footer_title">FEATURES</p>
          <LinkBtn to="/features#sizing" title="Size guide" />
          <LinkBtn to="/features#sharing" title="Share to pay" />
          <LinkBtn to="/features" title="Social impact" />
        </div>
        <div>
          <p className="footer_title">SOCIALS</p>
          <LinkBtn to="/" title="Instagram" />
          <LinkBtn to="/" title="Facebook" />
          <LinkBtn to="/" title="Twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
