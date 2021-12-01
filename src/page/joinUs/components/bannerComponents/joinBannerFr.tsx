import React from "react";
import "./joinBannerFr.less";
const BannerFr = () => {
  return (
    <div className="join_bannerFr">
      <a
        className="reward_rules"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Reward rules&gt;&gt;
      </a>
      <h2>
        20,000<i>CTO</i>
      </h2>
      <h3>≈ $12938.28</h3>
      <div className="now_address">
        <img src={require("./img/icon_li.svg")} alt="" />
        <div className="fr">
          <h4>0x5671k....019364</h4>
          <p>Expected to win the Grand Prize</p>
        </div>
      </div>
      <ul>
        <li>
          <img src={require("./img/icon_li.svg")} alt="" />
          <div className="fr">
            <h4 className="address">0x5671k....019364</h4>
            <h4 className="dot">20DOT</h4>
            <p>13:12:09 09/10</p>
          </div>
        </li>
        <li>
          <img src={require("./img/icon_li.svg")} alt="" />
          <div className="fr">
            <h4 className="address">0x5671k....019364</h4>
            <h4 className="dot">20DOT</h4>
            <p>13:12:09 09/10</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default BannerFr;
