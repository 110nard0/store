import React from "react";

import "@asset/pages/AccountPage.scss";
import { Outlet, Link, useNavigate } from "react-router-dom";

import img1 from "@images/image2.jpg";
import { authContext } from "@store/context";
import { getPage } from "@utils/helpers";

const AccountsPage = () => {
  // HDR: INITIALISERS
  const { user } = authContext();
  const currentPage = getPage("account/");
  const navigate = useNavigate();

  // HDR: JSX
  return (
    <section className="account-page">
      <div className="container">
        <header className="header">
          <div className="avatar">
            <img src={img1} alt="profile pic" aria-label="profile picture" />
          </div>
          <div className="profile_details">
            <h1 className="profile_heading">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="profile_subheading">{user?.email}</p>
          </div>
        </header>
        <nav className="navigator">
          <button
            to="."
            onClick={() => navigate(".")}
            className={`nav-tab ${currentPage === "account" && "active"}`}
          >
            Profile
          </button>
          <button
            onClick={() => navigate("security")}
            className={`nav-tab ${currentPage === "security" && "active"}`}
          >
            Security
          </button>
        </nav>
        <Outlet />
      </div>
    </section>
  );
};

export default AccountsPage;
