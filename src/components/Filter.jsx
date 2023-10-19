import React, { useState } from "react";

import "../assets/styles/component/Filter.scss";

import { BsFilter, BsArrowUpRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import useClickOutiside from "../hooks/use-clickOutside";
import { Link } from "react-router-dom";
import CheckBox from "./CheckBox";

const clothType = ["Tops", "Bottoms", "Hats"];
const sizes = [
  { title: "X", value: "Small" },
  { title: "M", value: "Medium" },
  { title: "L", value: "Large" },
  { title: "XL", value: "Extra Large" },
  { title: "XXL", value: "Ultra Large" },
];

const colours = ["Red", "Green", "Blue", "White", "Black"];

const Filter = () => {
  const {
    visible: showDropDown,
    setVisible: setShowDropDown,
    ref,
  } = useClickOutiside(false);

  const [filters, setFilters] = useState({
    "cloth-type": [],
    sizes: [],
    colour: [],
  });

  const filterHandler = (event) => {
    const { value, name, checked } = event.target;

    if (checked) {
      setFilters((prev) => ({ ...prev, [name]: [...prev[name], value] }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: [...prev[name].filter((item) => item !== value)],
      }));
    }
  };

  return (
    <div className="filter" ref={ref}>
      {showDropDown ? (
        <button
          type="button"
          className="filter-dropdown_btn"
          onClick={() => setShowDropDown(!showDropDown)}
        >
          Close <MdClose size={20} />
        </button>
      ) : (
        <button
          type="button"
          className="filter-dropdown_btn"
          onClick={() => setShowDropDown(!showDropDown)}
        >
          Filter <BsFilter size={20} />
        </button>
      )}

      {showDropDown && (
        <div className="filter-dropdown">
          <div className="filter_options">
            <div className="heading">
              <p>Clothing type</p>
            </div>
            <div className="filter_btns">
              {clothType.map((cloth) => (
                <CheckBox
                  name="cloth-type"
                  value={cloth}
                  title={cloth}
                  key={cloth}
                  onchange={filterHandler}
                  checked={filters["cloth-type"].includes(cloth)}
                />
              ))}
            </div>
          </div>
          <div className="filter_options">
            <div className="heading">
              <p>Sizes</p>
              <button type="button" className="sizes-link">
                <Link to="/features">View our size guide</Link>
                <BsArrowUpRight />
              </button>
            </div>
            <div className="filter_btns">
              {sizes.map((size) => (
                <CheckBox
                  name="sizes"
                  value={size.value}
                  title={size.title}
                  key={size.title}
                  onchange={filterHandler}
                  checked={filters["sizes"].includes(size.value)}
                />
              ))}
            </div>
          </div>
          <div className="filter_options">
            <div className="heading">
              <p>Colour</p>
            </div>
            <div className="filter_btns">
              {colours.map((colour) => (
                <CheckBox
                  name="colour"
                  value={colour}
                  title={colour}
                  key={colour}
                  onchange={filterHandler}
                  checked={filters["colour"].includes(colour)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
