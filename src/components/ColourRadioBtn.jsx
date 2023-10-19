import React from "react";

import "../assets/styles/component/ColourRadioBtn.scss";

const ColourRadioBtn = ({ changeHandler, checked, colour }) => {
  return (
    <div className="radio-item">
      <label>
        <input
          type="radio"
          name="colours"
          value={colour}
          onChange={changeHandler}
          checked={checked}
        />
        <span style={{ "--clr": colour }}></span>
      </label>
    </div>
  );
};

export default ColourRadioBtn;
