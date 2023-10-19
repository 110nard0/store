import React from "react";

import "../assets/styles/component/RadioBtn.scss";

const RadioBtn = ({ title, name, value, changeHandler, checked }) => {
  return (
    <div className="radio-group">
      <label>
        {title}
        <input
          type="radio"
          name={name}
          value={value}
          onChange={changeHandler}
          checked={checked}
        />
        <span></span>
      </label>
    </div>
  );
};

export default RadioBtn;
