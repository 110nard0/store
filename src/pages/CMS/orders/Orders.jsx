import React, { useState } from "react";
import CmsHeader from "@components/CmsHeader";
import CmsBtn from "@components/CmsBtn";

const productLength = 64;

const Orders = () => {
  const [currntPage, setCurrntPage] = useState("add");

  const clickHandler = (e) => {
    let name = e.target.name;
    if (name === "add new") {
      setCurrntPage("back");
    } else {
      setCurrntPage("add");
    }
  };

  return (
    <div>
      <CmsHeader
        heading={`Order(${productLength})`}
        subheading="All orders that have been placed"
      >
        {currntPage === "add" ? (
          <CmsBtn name="add new" onClick={clickHandler} />
        ) : (
          <CmsBtn name="back" onClick={clickHandler} />
        )}
      </CmsHeader>
    </div>
  );
};

export default Orders;
