import React, { useContext } from "react";
import MIdenticon from "./identicon";
import "./joinBannerFr.less";
import { ParachainData } from "../../context";
import { sortName, getGrandPrizePool } from "../../utils/utils";
const BannerFr = () => {
  const parachainData = useContext(ParachainData);
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
        {getGrandPrizePool(parachainData?.count)[1]}
        <i>CTO</i>
      </h2>
      <h3>≈ $12938.28</h3>
      {parachainData?.list.length > 0 ? (
        <div className="now_address">
          <div className="polkadot_icon">
            <MIdenticon
              address={
                parachainData?.list.length ? parachainData.list[0].from : "-"
              }
              size={32}
            />
          </div>
          <div className="fr">
            <h4>{sortName(parachainData.list[0].from)}</h4>
            <p>Expected to win the Grand Prize</p>
          </div>
        </div>
      ) : (
        <div className="now_address op7">
          <div className="polkadot_icon"></div>
          <div className="fr"></div>
        </div>
      )}
      <ul>
        {parachainData?.list.length > 0 ? (
          parachainData.list.map((v, index) => {
            return (
              <li key={index}>
                <div className="polkadot_icon">
                  <MIdenticon address={v && v.from ? v.from : "-"} size={32} />
                </div>
                <div className="fr">
                  <h4 className="address">{sortName(v.from)}</h4>
                  <h4 className="dot">{v.total} DOT</h4>
                  <p>13:12:09 09/10</p>
                </div>
              </li>
            );
          })
        ) : (
          <>
            <li>
              <div className="polkadot_icon"></div>
              <div className="fr"></div>
            </li>
            <li>
              <div className="polkadot_icon"></div>
              <div className="fr"></div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default BannerFr;
