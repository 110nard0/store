import React, { useEffect, useRef, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";

import "../assets/styles/component/NavBar.scss";
import CustomLogo from "./CustomLogo";
import useClickOutiside from "../hooks/use-clickOutside";

const user = false;

const NavBar = () => {
  // CLOSE THE MOBILE MENU DROPDOWN WHEN CLICKED OUTSIDE IT CONTAINER
  const {
    ref: dropDrownRef,
    visible: showMenu,
    setVisible: setShowMenu,
  } = useClickOutiside(false);

  // PREVENT SCROLLING WHEN NAVBAR OPENS
  useEffect(() => {
    showMenu
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [showMenu]);

  // CLOSING THE MOBILE MENU DROPDOWN TO AVOID PAGE REFRESH
  useEffect(() => {
    const allLinks = document.querySelectorAll(".navbar-nav_links a");

    const closeDropdownhandler = () => {
      setShowMenu(false);
    };

    allLinks.forEach((link) =>
      link.addEventListener("click", closeDropdownhandler)
    );

    () =>
      allLinks.forEach((link) =>
        link.removeEventListener("click", closeDropdownhandler)
      );
  }, []);

  return (
    <div className="navbar">
      <nav className="navbar-nav" ref={dropDrownRef}>
        <Link to="/" className="navbar-nav_logo">
          <CustomLogo />
        </Link>

        <ul className={`navbar-nav_links ${showMenu && "show-menu"}`}>
          <li>
            <Link to="/">Features</Link>
          </li>

          <li>
            <Link to="/">Shop</Link>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/">Account</NavLink>
              </li>
              <li>
                <NavLink to="/">Bag&#40;0&#41;</NavLink>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/register">Create account</NavLink>
              </li>
            </>
          )}
        </ul>

        {!showMenu && (
          <Link to="/" className="navbar-nav_bag">
            <MdOutlineShoppingBag size={24} />
          </Link>
        )}
        <div
          className="navbar-nav_menu-icon"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="hamburger-menu">Menu</div>
        </div>
      </nav>
      <div
        className={`backdrop ${showMenu && "show-backdrop"}`}
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default NavBar;
