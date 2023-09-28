import React from "react";

import "../assets/styles/component/NavBar.scss";
import CustomLogo from "./CustomLogo";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-nav">
        <a href="/" className="navbar-nav_logo">
          <CustomLogo />
        </a>

        <div className="navbar-nav_list">
          <ul className="left-nav">
            <li>
              <a href="/">Contact us </a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
            <li>
              <a href="/">Features</a>
            </li>
          </ul>
          <ul className="right-nav">
            <li>
              <a href="/">Shop</a>
            </li>
            <li>
              <a href="/">Account</a>
            </li>
            <li>
              <a href="/">Bag&#40;0&#41;</a>
            </li>
          </ul>
        </div>
        <a href="/" className="navbar-nav_bag">
          bag
        </a>
        <a href="/" className="navbar-nav_menu-icon">
          menu
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
