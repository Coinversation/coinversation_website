import React from "react";
const Process = () => {
  return (
    <div className="process">
      <ul className="process_header">
        <li>
          <h3>20,000CTO</h3>
          <p>Grand Prize Pool</p>
        </li>

        <li>
          <h3>806</h3>
          <p>Address</p>
        </li>

        <li>
          <h3>6806DOT</h3>
          <p>Total pledge</p>
        </li>

        <li>
          <h3>2.8CTO</h3>
          <p>Expected reward per DOT</p>
        </li>
      </ul>
      <h4>
        6808 / <i>10,000 Address</i>
      </h4>
      <div className="line">
        <i></i>
        <em></em>
        <h5>89%</h5>
      </div>
      <p>
        The number of CTO awards increases with the number of pledges made by
        DOT. For every 1,000 DOT, the number of CTO awards increases by 10,000,
        and so on
      </p>
      <img
        className="icon_bg_err"
        src={require("./img/icon_bg_err.svg")}
        alt=""
      />
    </div>
  );
};
export default Process;
