import React, { useEffect, useRef, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";

import "../assets/styles/component/NavBar.scss";
import CustomLogo from "./CustomLogo";
import useClickOutiside from "../hooks/use-clickOutside";
import HamburgerSVG from "./HamburgerSVG";
import CloseSVG from "./CloseSVG";
import { cartContext } from "../store/context";

const user = true;

const NavBar = () => {
  const {
    state: { cart },
  } = cartContext();

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
    <header className="navbar">
      <nav className="navbar-nav" ref={dropDrownRef}>
        <Link to="/" className="navbar-nav_logo">
          <CustomLogo />
        </Link>

        <ul className={`navbar-nav_links ${showMenu && "show-menu"}`}>
          <li>
            <NavLink to="/features">Features</NavLink>
          </li>

          <li>
            <NavLink to="/products">Shop</NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/">Account</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Bag&#40;{cart.length}&#41;</NavLink>
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

        {!showMenu &&
          (user ? (
            <Link to="/products" className="navbar-nav_bag">
              <MdOutlineShoppingBag size={24} />
            </Link>
          ) : (
            <NavLink to="/login" className="navbar-nav_bag">
              Log in
            </NavLink>
          ))}
        <div
          className="navbar-nav_menu-icon"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <CloseSVG /> : <HamburgerSVG />}
        </div>
      </nav>
      <div
        className={`backdrop ${showMenu && "show-backdrop"}`}
        aria-hidden="true"
      ></div>
    </header>
  );
};

export default NavBar;
