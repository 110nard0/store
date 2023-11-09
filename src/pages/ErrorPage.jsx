import React from "react";

import "@asset/pages/ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="error_container">
        <h3 className="heading">Page not found</h3>
        <h4 className="subheading">
          Oops! Sorry but we could not find the page you are looking for.
        </h4>

        <Link to="/" className="back_btn">
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
