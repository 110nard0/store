import React, { forwardRef } from "react";

import "@asset/component/RadioBtn.scss";

const RadioBtn = forwardRef((props, ref) => {
  return (
    <div className="radio-group">
      <label>
        {props.title}
        <input type="radio" {...props} ref={ref} />
        <span></span>
      </label>
    </div>
  );
});

export default RadioBtn;
