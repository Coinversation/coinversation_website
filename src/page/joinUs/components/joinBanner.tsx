import React from "react";
import JoinBannerFl from "./bannerComponents/joinBannerFl";
import JoinBannerFr from "./bannerComponents/joinBannerFr";
import { LastParachainData } from "./context/LastParachainData";
import "./joinBanner.less";
const JoinBanner = () => {
  return (
    <div className="join_banner">
      <div className="join_banner_inner">
        <LastParachainData>
          <JoinBannerFl />
        </LastParachainData>
        <JoinBannerFr />
      </div>
    </div>
  );
};
export default JoinBanner;
