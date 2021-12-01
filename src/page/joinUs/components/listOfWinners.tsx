import React from "react";
import Tips from "@/components/tips/tipsWidget";
import "./listOfWinners.less";
const ListOfWinners = () => {
  return (
    <div className="listOfWinners">
      <h2>List of winners</h2>
      <ul>
        <li>
          <h3>8942</h3>
          <h4>
            Block height
            <Tips message="ddd" />
          </h4>
          <p>0xbe807dddb074639cd9fa61b47676c064fc50d62c</p>
        </li>
        <li>
          <h3>8942</h3>
          <h4>
            Block height
            <Tips message="ddd" />
          </h4>
          <p>0xbe807dddb074639cd9fa61b47676c064fc50d62c</p>
        </li>
      </ul>
    </div>
  );
};
export default ListOfWinners;
