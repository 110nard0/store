import React from "react";

import "@asset/component/CmsBtn.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const CmsBtn = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`${
        props.name === "add new"
          ? "add_button"
          : props.name === "back"
          ? "back_button"
          : "neutral_button"
      }`}
    >
      {props.name === "add new" ? (
        <AiOutlinePlus />
      ) : props.name === "back" ? (
        <BiArrowBack />
      ) : (
        { ...props.children }
      )}
      {props.name}
    </button>
  );
};

export default CmsBtn;
