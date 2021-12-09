import React, { useContext } from "react";
import { ContributeDataContext } from "../context/ContributeData";
import { getGrandPrizePool } from "../utils/utils";
import "./process.less";
const Process = () => {
  const parachainData = useContext(ContributeDataContext);
  return (
    <div className="process">
      <ul className="process_header">
        <li>
          <h3> {getGrandPrizePool(parachainData?.count)[1]} CTO</h3>
          <p>Grand Prize Pool</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.count ? parachainData.count : "-"}
          </h3>
          <p>Address</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.alltotal
              ? parachainData.alltotal
              : "-"}{" "}
            DOT
          </h3>
          <p>Total pledge</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.alltotal
              ? parseFloat(
                  `${
                    Number(getGrandPrizePool(parachainData?.count)[0]) /
                    parachainData.alltotal
                  }`
                ).toFixed(0)
              : "-"}{" "}
            CTO
          </h3>
          <p>Expected reward per DOT</p>
        </li>
      </ul>
      <div className="process_inner">
        <div className="line">
          <h4>
            {parachainData && parachainData.count ? parachainData.count : "-"} /
            <i>{getGrandPrizePool(parachainData?.count)[0]} Address</i>
          </h4>
          <div className="line_bg">
            <i
              style={{
                width:
                  parachainData && parachainData.count
                    ? `${
                        (parachainData.count /
                          Number(getGrandPrizePool(parachainData?.count)[2])) *
                        100
                      }%`
                    : "40%",
              }}
            ></i>
          </div>
          <h5>
            {parachainData && parachainData.count
              ? `${parseFloat(
                  `${
                    (parachainData.count /
                      Number(getGrandPrizePool(parachainData?.count)[2])) *
                    100
                  }`
                ).toFixed(1)}%`
              : "40%"}
          </h5>
        </div>
        <p className="text">
          The number of CTO awards increases with the number of pledges made by
          DOT. For every 1,000 DOT, the number of CTO awards increases by
          10,000, and so on
        </p>
        <img
          className="icon_bg_err"
          src={require("./img/icon_bg_err.svg")}
          alt=""
        />
      </div>
    </div>
  );
};
export default Process;
