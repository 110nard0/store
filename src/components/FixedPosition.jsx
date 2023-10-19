import React from "react";

const style = {
  maxWidth: "80rem",
  width: "90%",
  position: "fixed",
  top: "9rem",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 50,
};

const FixedPosition = (props) => {
  return (
    <div style={style} {...props}>
      {props.children}
    </div>
  );
};

export default FixedPosition;
