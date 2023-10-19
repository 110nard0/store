import React from "react";

import "../assets/styles/component/CheckBox.scss";

const CheckBox = ({ name, value, title, onchange, checked }) => {
  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onchange}
          checked={checked}
        />
        {title}
        <span></span>
      </label>
    </div>
  );
};

export default CheckBox;
