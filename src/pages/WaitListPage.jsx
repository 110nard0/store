import React from "react";
import WaitListForm from "@pages/comp/WaitListForm";
import "@asset/pages/waitlist-page.scss";

import CustomLogo from "@components/CustomLogo.jsx";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const WaitListPage = () => {
  return (
    <section className="waitlist_page">
      <header className="waitlist_page-header">
        <Link to="/" className="waitlist_page-header-logo">
          <CustomLogo />
        </Link>
        <p className="waitlist_page-header-text">LAUNCHING SOON</p>
      </header>
      <main className="waitlist_page-main">
        <div className="waitlist_display">
          <p className="waitlist_display-intro">TRYST + GENIUS = TRGST</p>

          <h2 className="waitlist_display-heading">
            pronounced{" "}
            <span className="waitlist_display-heading__highlight">
              &#x5B;trist&#x5D;
            </span>
          </h2>
          <p className="waitlist_display-subheading">
            We are an exclusive affair of the collective genius.
          </p>
        </div>
        <div className="waitlist_form">
          <WaitListForm />
        </div>
      </main>
      <footer className="waitlist_page-footer">
        <button type="button" className="footer-link">
          <a href="/">Follow us on Instagram</a>
          <BsArrowUpRight />
        </button>
      </footer>
    </section>
  );
};

export default WaitListPage;
