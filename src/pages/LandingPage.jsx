import React from "react";

import "../assets/styles/pages/LandingPage.scss";

import bgMobile from "../assets/images/bg-mobile.png";
import bgDesktop from "../assets/images/bg-desktop.jpeg";

const LandingPage = () => {
  return (
    <section className="landing-page">
      <picture className="bg">
        <source media="(max-width: 599px)" srcSet={bgMobile} />

        <img src={bgDesktop} alt="" role="presentaion" />
      </picture>

      {/* <div style={{ height: "200vh" }}>hello</div> */}
    </section>
  );
};

export default LandingPage;
