import React, { useContext } from "react";
import JoinBannerFl from "./bannerComponents/joinBannerFl";
import JoinBannerFr from "./bannerComponents/joinBannerFr";
import { ContributeDataContext } from "../context/ContributeData";
import { getGrandPrizePool } from "../utils/utils";
import "./joinBanner.less";
const JoinBanner = () => {
  const parachainData = useContext(ContributeDataContext);
  return (
    <div className="join_banner">
      <div className="join_banner_inner">
        <h2 className="join_banner_inner_warn">
          Share extra {getGrandPrizePool(parachainData?.count)[3]} CTO if no
          more contribute within 150 blocks after yours
        </h2>
        <div className="join_banner_inner_inner">
          <JoinBannerFl />
          <JoinBannerFr />
        </div>
      </div>
    </div>
  );
};
export default JoinBanner;
