import React from "react";

import "../assets/styles/component/Filter.scss";

import { BsFilter } from "react-icons/bs";
import useClickOutiside from "../hooks/use-clickOutside";

const Filter = () => {
  const {
    visible: showDropDown,
    setVisible: setShowDropDown,
    ref,
  } = useClickOutiside(false);

  return (
    <div className="filter" ref={ref}>
      <button
        type="button"
        className="filter-dropdown_btn"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        Filter <BsFilter size={20} />
      </button>

      {showDropDown && <div className="filter-dropdown">drop down</div>}
    </div>
  );
};

export default Filter;
