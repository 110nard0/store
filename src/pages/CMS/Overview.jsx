import React, { useState } from "react";

import "@asset/pages/cms/Overview.scss";

import CustomLogo from "@components/CustomLogo";
import CmsBtn from "@components/CmsBtn";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiCoatHangerBold } from "react-icons/pi";
import {
  MdOutlineCategory,
  MdOutlineTornado,
  MdColorize,
  MdOutlineSettings,
  MdLogout,
  MdClose,
} from "react-icons/md";
import { HiBolt } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag, BsSearch, BsPerson } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkInLocation } from "@utils/helpers";
import { cmsContext } from "@store/context";

// NOTE: Remember to turn off disabled after completing
const links = [
  { name: "Dashboard", url: "admin", icon: <LuLayoutDashboard /> },
  { name: "Orders", url: "orders", icon: <BsBag /> },
  { name: "Products", url: "products", icon: <PiCoatHangerBold /> },
  { name: "Preferences", url: "preferences", icon: <HiBolt /> },
  { name: "Categories", url: "categories", icon: <MdOutlineCategory /> },
  { name: "Sizes", url: "sizes", icon: <MdOutlineTornado /> },
  { name: "Colours", url: "colours", icon: <MdColorize /> },
  {
    name: "Settings",
    url: "settings",
    icon: <MdOutlineSettings />,
    disabled: true,
  },
  { name: "Log out", url: "/", icon: <MdLogout />, disabled: true },
];

const Overview = () => {
  // HDR: INITIALISERS

  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { dispatch } = cmsContext();

  // HDR: ACTIONS HANDLER

  const searchHandler = (e) => {
    // REVIEW: You can utilize api call to search for that value before setting the state
    let val = e.target.value;
    //   searchRef.current.value = "";

    //   const searchVal = "";
    //   dispatch({
    //     type: "SEARCH",
    //     payload: searchVal,
    //   });
    //   return;
    // }

    // const searchVal = searchRef.current?.value;
    dispatch({
      type: "SEARCH",
      payload: val,
    });
  };

  const clickHandler = (url) => {
    setShowMobileMenu(false);
    if (url === "admin") {
      navigate(".");
      return;
    }
    navigate(url);
  };

  return (
    <section className="cms_overview">
      <aside className={`sidebar ${showMobileMenu && "open"}`}>
        <nav className="nav">
          <div className="nav_bar_logo">
            <Link to="/">
              <CustomLogo />
            </Link>
          </div>
          <ul className="nav_links">
            {links.map((link) => (
              <li key={link.name}>
                <button
                  type="button"
                  className={`link_btn ${
                    checkInLocation(link.url) && "active"
                  }`}
                  onClick={() => clickHandler(link.url)}
                  disabled={link.disabled}
                >
                  {link.icon}
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu_btn">
          <CmsBtn onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <MdClose /> : <GiHamburgerMenu />}
          </CmsBtn>
        </div>
      </aside>

      <section className="right_section">
        <header className="header">
          <div className="input-group">
            <BsSearch />
            <input
              type="text"
              name="search"
              placeholder="Enter keywords to search"
              onChange={searchHandler}
            />
          </div>
          <button type="button" className="sign_btn">
            <BsPerson /> Sign in
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default Overview;
