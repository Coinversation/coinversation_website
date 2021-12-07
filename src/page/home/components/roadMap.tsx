import React from "react";
import "./roadMap.less";
export default function RoadMap() {
  return (
    <div
      className="roadMap   animate animate__animated"
      data-animate="animate__fadeInUp"
      id="RoadMap"
    >
      <h2>
        Coinversation<i> Roadmap</i>
      </h2>
      <ul>
        <li>
          <h3>2020 Q4~2021Q4</h3>
          <p>
            Fragmentation protocol, DEX, and synthetic assets have all been
            developed
          </p>
        </li>
        <li>
          <h3>2021 Q4~2022 Q1</h3>
          <p>
            Participate in Polkadot Parachain auction and deploy our parachain
            on Polkadot
          </p>
        </li>
        <li>
          <h3>2022 Q2~2022 Q4 </h3>
          <p>
            Launch Dex, interest-bearing asset protocol with stable currecies
          </p>
        </li>
      </ul>
    </div>
  );
}
