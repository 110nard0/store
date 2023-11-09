import React, { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import "@asset/component/CmsDropDown.scss";
import { BiErrorCircle } from "react-icons/bi";

const CmsSelectDropDown = (props) => {
  return (
    <div className={`dropdown_container ${props.mode === "light" && "light"}`}>
      <button
        type="button"
        className={`cms_select ${props.open && "open"}  ${
          props.error && "error"
        }`}
        onClick={props.onclick}
      >
        {props.selected}
        <MdOutlineExpandMore className="expand_icon" />
      </button>

      <div className={`select_options ${props.open && "open"}`}>
        {props.children}
      </div>
    </div>
  );
};

export default CmsSelectDropDown;
