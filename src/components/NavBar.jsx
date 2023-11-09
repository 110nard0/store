import React, { useEffect, useRef, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";

import "@asset/component/NavBar.scss";
import CustomLogo from "@components/CustomLogo.jsx";
import useClickOutiside from "@hooks/use-clickOutside.js";
import HamburgerSVG from "@components/HamburgerSVG.jsx";
import CloseSVG from "@components/CloseSVG.jsx";
import { cartContext } from "@store/context.jsx";
import { authContext } from "../store/context";

const NavBar = () => {
  // HDR: INITIALISER

  const [showFloatNav, setShowFloatNav] = useState(true);

  const {
    state: { cart },
  } = cartContext();

  const { user } = authContext();

  //HDR: CLOSE THE MOBILE MENU DROPDOWN WHEN CLICKED OUTSIDE IT CONTAINER
  const {
    ref: dropDrownRef,
    visible: showMenu,
    setVisible: setShowMenu,
  } = useClickOutiside(false);

  //HDR: PREVENT SCROLLING WHEN NAVBAR OPENS
  useEffect(() => {
    showMenu
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [showMenu]);

  //HDR: CLOSING THE MOBILE MENU DROPDOWN TO AVOID PAGE REFRESH
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

  //  HDR: ANIMATION FOR SHOWING NAVIGATION
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      let currentScrollY = window.scrollY;

      if (lastScrollY < currentScrollY) {
        setShowFloatNav(false);
      } else {
        if (window.scrollY <= 60) setShowFloatNav(true);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${!showFloatNav && "hide_nav"}`}>
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
                <NavLink to="/account">Account</NavLink>
              </li>

              <li>
                <NavLink to="/logout">Log out</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Bag&#40;{cart.length}&#41;</NavLink>
              </li>

              {/* NOTE: ADMIN USER ONLY CAN SEE */}
              {user && user["is_staff"] && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
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
