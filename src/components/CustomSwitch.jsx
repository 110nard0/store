import React from "react";
import "@asset/component/CustomSwitch.scss";

const CustomSwitch = ({ checked, id, onChange }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="switch"
      />
      <label htmlFor={id} className="switch_label"></label>
    </>
  );
};

export default CustomSwitch;
