import React from "react";

import "@asset/component/CmsHeader.scss";

const CmsHeader = (props) => {
  let { heading, subheading } = props;
  return (
    <header className="cms_header">
      <div className="left">
        <h5 className="heading">{heading}</h5>
        <h6 className="subheading">{subheading}</h6>
      </div>
      {props.children}
    </header>
  );
};

export default CmsHeader;
