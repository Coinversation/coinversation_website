import Tips from "@/components/tips/tipsWidget";
import React from "react";
const ListOfWinners = () => {
  return (
    <div className="listOfWinners">
      <h2>List of winners</h2>
      <ul>
        <li>
          <h3>8942</h3>
          <h4>Block height</h4>
          <Tips message="ddd" />
          <p>0xbe807dddb074639cd9fa61b47676c064fc50d62c</p>
        </li>
      </ul>
    </div>
  );
};
export default ListOfWinners;
