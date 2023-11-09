import React, { forwardRef, useMemo, useState } from "react";

import "@asset/component/SelectInput.scss";
import { FaChevronDown } from "react-icons/fa";

const SelectInput = forwardRef((props, ref) => {
  return (
    <div
      className={`select_field ${props.open && "open"} ${
        props.error && "error"
      }`}
      role="button"
      ref={ref}
      onClick={props.onClick}
    >
      <h3 className="value">{props.value}</h3>
      <input id={props.id} readOnly autoComplete="off" type="text" />
      <FaChevronDown />
    </div>
  );
});

export default SelectInput;
