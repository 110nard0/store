import React from "react";
import "@asset/component/CustomTable.scss";

const CustomTable = ({ heading, children }) => {
  return (
    <table className="table">
      <thead className="table_head">
        <tr>
          {heading.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default CustomTable;
