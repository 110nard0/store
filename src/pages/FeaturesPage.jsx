import React, { useEffect } from "react";

import "@asset/pages/FeaturesPage.scss";
import CustomTable from "@components/CustomTable";
import { bottomsData, topsData } from "../data/data";
import { useLocation } from "react-router-dom";

const topHeading = ["Size", "shoulder", "chest", "length"];
const bottomHeading = ["Size", "waist", "hips", "length"];

const FeaturesPage = () => {
  // HDR: Section navigator effect
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        let rect = elem.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 130,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  // HDR : JSX
  return (
    <section className="features">
      <div className="social-impact_container" id="social-impact">
        <div className="image_container"></div>
        <div className="text_container">
          <h2 className="heading">Social impact projects</h2>
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

      <div className="sizing_container" id="sizing">
        <div className="size_header">
          <h2 className="heading">Size & fit guide</h2>
          <p className="size_subheading">
            We use inches (in) for our sizing guide and measurements
          </p>
        </div>

        <p className="title">Tops</p>
        <CustomTable const heading={topHeading}>
          <tbody>
            {topsData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.size}</td>
                  <td>{data.shoulder}</td>
                  <td>{data.chest}</td>
                  <td>{data.length}</td>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>

        <p className="title">Bottoms</p>
        <CustomTable heading={bottomHeading}>
          <tbody>
            {bottomsData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.size}</td>
                  <td>{data.shoulder}</td>
                  <td>{data.chest}</td>
                  <td>{data.length}</td>
                </tr>
              );
            })}
          </tbody>
        </CustomTable>
      </div>
      <div className="sharing_container" id="sharing">
        <div className="text_container">
          <h2 className="heading">Buy now + share feature</h2>
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
