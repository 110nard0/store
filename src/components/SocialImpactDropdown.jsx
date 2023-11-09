import React, { useMemo, useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import useClickOutiside from "../hooks/use-clickOutside";
import RadioBtn from "./RadioBtn";

import states from "../data/states-data";
import { Link } from "react-router-dom";

const impacts = [
  { name: "Alt School - Tech" },
  { name: "MANI - Mental Health" },
  { name: "NIKE - Creative Arts" },
];

const SocialImpackDropdown = ({ socialImpact, setSocialImpact, error }) => {
  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref,
  } = useClickOutiside(false);

  useMemo(() => {
    setShowOptions(false);
  }, [socialImpact]);

  return (
    <div ref={ref}>
      <label onClick={() => setShowOptions((prev) => !prev)} className="label">
        Impact project
        <div className="sublabel">
          We will donate 2% of your total purchase to a social impact project of
          your choice.{" "}
          <Link to="/features" className="social_link">
            Learn more
          </Link>
        </div>
      </label>
      <div
        className={`preference_box ${showOptions && "open"} ${
          error && "error"
        }`}
        onClick={() => setShowOptions((prev) => !prev)}
        id="state"
      >
        <p>{socialImpact.state}</p> <FaChevronDown />
      </div>
      {showOptions && (
        <div className="preference_select">
          <div className="states_container">
            {impacts.map((sta) => (
              <RadioBtn
                name="sizes"
                value={sta.name}
                title={sta.name}
                key={sta.name}
                changeHandler={() =>
                  setSocialImpact((prev) => ({ ...prev, state: sta.name }))
                }
                checked={socialImpact.state === sta.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialImpackDropdown;
