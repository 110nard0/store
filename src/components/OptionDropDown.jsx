import React from "react";

import "@asset/component/OptionDropDown.scss";

const OptionDropDown = (props) => {
  return <div className="options">{props.children}</div>;
};

export default OptionDropDown;
