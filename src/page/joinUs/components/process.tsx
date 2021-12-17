import React, { useContext } from "react";
import { ContributeDataContext } from "../context/ContributeData";
import { getGrandPrizePool, formatNumber } from "../utils/utils";
import "./process.less";
const Process = () => {
  const parachainData = useContext(ContributeDataContext);
  return (
    <div className="process">
      <ul className="process_header">
        <li>
          <h3> {getGrandPrizePool(parachainData?.count)[1]} CTO</h3>
          <p>Bonus Pool</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.count
              ? formatNumber(`${parachainData.count}`)
              : "-"}
          </h3>
          <p>Address via this page</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.alltotal
              ? formatNumber(`${parachainData.alltotal}`)
              : "-"}{" "}
            DOT
          </h3>
          <p>Total Staked</p>
        </li>

        <li>
          <h3>
            {parachainData && parachainData.alltotal
              ? formatNumber(
                  parseFloat(
                    `${
                      Number(getGrandPrizePool(parachainData?.count)[0]) /
                      parachainData.alltotal
                    }`
                  ).toFixed(0)
                )
              : "-"}{" "}
            CTO
          </h3>
          <p>Expected reward per DOT</p>
        </li>
      </ul>
      <div className="process_inner">
        <img
          className="icon_bg_err"
          src={require("./img/icon_bg_err.svg")}
          alt=""
        />
        <div className="line">
          <h4>
            {parachainData && parachainData.count ? parachainData.count : "-"}
            <i>
              <em>/</em>
              {getGrandPrizePool(parachainData?.count)[2]} Address
            </i>
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
          DOT. For every 2,000 contributors, the number of CTO awards increases
          by 0.2%(0.14% for bonus pool, 0.06% for lottery pool), and so on until
          the maximum 2%
        </p>
      </div>
    </div>
  );
};
export default Process;
