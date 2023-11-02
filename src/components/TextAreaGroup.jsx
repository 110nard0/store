import React, { forwardRef } from "react";

import "@asset/component/TextGroup.scss";

import { BiErrorCircle } from "react-icons/bi";

const TextAreaGroup = forwardRef((props, ref) => {
  let { error } = props;
  return (
    <div className={`text-group ${error && "error"} ${props.admin}`}>
      <label htmlFor={props.id}>{props.title} </label>
      <textarea {...props} ref={ref} />
      {error && props.errormessage && (
        <span>
          <BiErrorCircle /> {props.errormessage}
        </span>
      )}
    </div>
  );
});

export default TextAreaGroup;
