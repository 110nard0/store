import React, { useMemo, useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import useClickOutiside from "../hooks/use-clickOutside";
import RadioBtn from "./RadioBtn";

import states from "../data/states-data";

const StatesDropdown = ({ selectedState, setSelectedState, error }) => {
  const [searchValue, setSearchValue] = useState("");

  const {
    visible: showOptions,
    setVisible: setShowOptions,
    ref,
  } = useClickOutiside(false);

  const searchHandler = (e) => {
    let value = e.target.value;

    if (value.trim() === " ") {
      return;
    }
    setSearchValue(value);
  };

  useMemo(() => {
    setShowOptions(false);
    setSearchValue("");
  }, [selectedState]);

  return (
    <div ref={ref}>
      <label onClick={() => setShowOptions((prev) => !prev)} className="label">
        State
      </label>
      <div
        className={`preference_box ${showOptions && "open"} ${
          error && "error"
        }`}
        onClick={() => setShowOptions((prev) => !prev)}
        id="state"
      >
        <p>{selectedState.state}</p> <FaChevronDown />
      </div>
      {showOptions && (
        <div className="preference_select">
          <div className="search_container">
            <BsSearch size={20} />
            <input
              type="text"
              name="search_state"
              className="search_input"
              placeholder="search"
              value={searchValue}
              onChange={searchHandler}
            />
          </div>
          <div className="states_container">
            {states
              .filter((state) => {
                if (
                  state.name.toLowerCase().startsWith(searchValue.toLowerCase())
                ) {
                  return state;
                }
              })
              .map((sta) => (
                <RadioBtn
                  name="sizes"
                  value={sta.name}
                  title={sta.name}
                  key={sta.name}
                  changeHandler={() =>
                    setSelectedState((prev) => ({ ...prev, state: sta.name }))
                  }
                  checked={selectedState.state === sta.name}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatesDropdown;
