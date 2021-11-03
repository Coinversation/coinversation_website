import React from "react";
import "./banner.less";
export default function Banner() {
  return (
    <div className="banner">
      <div className="banner_inner">
        <h2>
          <i>A Synthetic Asset Issuance Protocol &</i>
          Decentralised Contract Trading
        </h2>
        <p>
          <i>Exchange Based on Polkadot Contract Chain</i>
        </p>
        <h3>
          White Paper
          <img src={require("../img/icon_arror.png")} alt="logo" />
        </h3>
      </div>
    </div>
  );
}
