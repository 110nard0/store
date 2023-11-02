import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = (props) => {
  const { title, description } = props;
  return (
    <Helmet>
      <meta name="description" content={description} />
      <title> {title}</title>
      {props.children}
    </Helmet>
  );
};

export default MetaTag;
