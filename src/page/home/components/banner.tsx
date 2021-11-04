import React from "react";
import "./banner.less";
export default function Banner() {
  return (
    <div className="banner">
      <div className="banner_inner">
        <div className="h1">
          <h1
          // className="animate animate__animated"
          // data-animate="animate__fadeInUp"
          // data-animation-delay="1.1s"
          >
            <i> Financial Derivatives & </i>
            NFT Protocol Platform
            {/* <i>A Synthetic Asset Issuance Protocol & </i>
            Decentralised Contract Trading */}
          </h1>
        </div>
        <p
          className="animate animate__animated"
          data-animate="animate__fadeInUp"
          data-animation-delay="1.5s"
        >
          <i>Platform Based on Polkadot</i>
        </p>
        <a
          href="https://github.com/Coinversation/white-paper"
          target="_blank"
          rel="noopener noreferrer"
          title="Coinversation"
        >
          <h3>
            White Paper
            <img src={require("../img/icon_arror.svg")} alt="logo" />
          </h3>
        </a>
      </div>
    </div>
  );
}
