import React, { forwardRef } from "react";

import "@asset/component/InputGroup.scss";

import { BiErrorCircle } from "react-icons/bi";

const InputGroup = forwardRef((props, ref) => {
  let { error } = props;
  return (
    <div className={`input-group ${error && "error"} ${props.admin}`}>
      <label htmlFor={props.id}>{props.title} </label>
      <input {...props} ref={ref} />
      {error && props.errormessage && (
        <span>
          <BiErrorCircle /> {props.errormessage}
        </span>
      )}
    </div>
  );
});

export default InputGroup;
