import React from "react";

import "../assets/styles/pages/FeaturesPage.scss";

const FeaturesPage = () => {
  return (
    <section className="features">
      <div className="social-impact_container">
        <div className="image_container"></div>
        <div className="text_container">
          <p className="heading">Social impact projects</p>
          <p className="paragraph">
            When it comes to feeling good, go with your gut. Our daily Gut
            Health supplement contains Pre and Probiotic Cultures along with
            Selenium and Zinc to support a healthy digestive system. They say
            the gut is the second brain, so consider Gut Health the smartest
            thing you’ll do for your body each day.
          </p>
          <ul>
            <li>Alt School Africa</li>
            <li>Alt School Africa</li>
            <li>Alt School Africa</li>
          </ul>
        </div>
      </div>

      <div className="sizing_container">Sizes</div>
      <div className="sharing_container">
        <div className="text_container">
          <p className="heading">Buy now + share feature</p>
          <p className="paragraph">
            When it comes to feeling good, go with your gut. Our daily Gut
            Health supplement contains Pre and Probiotic Cultures along with
            Selenium and Zinc to support a healthy digestive system. They say
            the gut is
          </p>
        </div>
        <div className="image_container"></div>
      </div>
    </section>
  );
};

export default FeaturesPage;
