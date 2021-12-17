import React, { useContext, useEffect, useState } from "react";
import MIdenticon from "./identicon";
import "./joinBannerFr.less";
import { ContributeDataContext } from "../../context/ContributeData";
import { sortName, getGrandPrizePool } from "../../utils/utils";
import { getRate } from "../../server/api";
const BannerFr = () => {
  const parachainData = useContext(ContributeDataContext);
  const [rate, setRate] = useState<number>();

  useEffect(() => {
    (async () => {
      const res = await getRate();
      setRate(res);
    })();
  }, []);
  return (
    <div className="join_bannerFr">
      <a
        className="reward_rules"
        href="https://coinversationofficial.medium.com/coinversation-will-participate-in-batch-2-polkadot-parachain-auction-2c8a76268af0"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rules
        {/* &gt;&gt; */}
      </a>
      <h2>
        {getGrandPrizePool(parachainData?.count)[3]}
        <i>CTO</i>
      </h2>
      <h3>
        ≈ $
        {rate
          ? parseFloat(
              `${Number(getGrandPrizePool(parachainData?.count)[4]) * rate}`
            ).toFixed(2)
          : ""}
      </h3>
      {parachainData && parachainData.list && parachainData.list.length > 0 ? (
        <div className="now_address">
          <div className="polkadot_icon">
            <MIdenticon
              address={
                parachainData && parachainData.list && parachainData.list.length
                  ? parachainData?.list[0]?.address
                  : ""
              }
              size={32}
            />
          </div>
          <div className="fr">
            <h4>{sortName(parachainData?.list[0]?.address)}</h4>
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
        {parachainData &&
        parachainData.list &&
        parachainData.list.length > 0 ? (
          parachainData.list.slice(0, 2).map((v, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  window.open(
                    `https://polkadot.subscan.io/extrinsic/${v.extrinsicHash}`
                  );
                }}
              >
                <div className="polkadot_icon">
                  <MIdenticon address={v?.address} size={32} />
                </div>
                <div className="fr">
                  <h4 className="address">{sortName(v?.address)}</h4>
                  <h4 className="dot">{v?.amount} DOT</h4>
                  <p>{v?.blockNum}</p>
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
