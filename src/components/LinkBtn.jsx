import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/component/LinkBtn.scss";

const LinkBtn = ({ to, title }) => {
  return (
    <Link to={to} className="link">
      {title}
    </Link>
  );
};

export default LinkBtn;
