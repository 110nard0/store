import React from "react";

import "../assets/styles/pages/ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="error_container">
        <p className="heading">Page not found</p>
        <p className="subheading">
          Oops! Sorry but we could not find the page you are looking for.
        </p>

        <Link to="/" className="back_btn">
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
