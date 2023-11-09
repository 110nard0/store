import React, { forwardRef } from "react";

import "@asset/component/ColourRadioBtn.scss";

const ColourRadioBtn = forwardRef((props, ref) => {
  return (
    <div className="radio-item">
      <label>
        <input type="radio" {...props} ref={ref} />
        <span className="radio_btn" style={{ "--clr": props.colour }}></span>
        <span className="colour_tag" style={{ "--txt": props.textclr }}>
          {props.label}
        </span>
      </label>
    </div>
  );
});

export default ColourRadioBtn;
