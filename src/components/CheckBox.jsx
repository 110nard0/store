import React from "react";

import "../assets/styles/component/Checkbox.scss";

const CheckBox = ({ name, value, title }) => {
  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" name={name} value={value} />
        {title}
        <span></span>
      </label>
    </div>
  );
};

export default CheckBox;
