import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = ({ title, description }) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <title> {title}</title>
    </Helmet>
  );
};

export default MetaTag;
