import React from "react";
import JoinBannerFl from "./bannerComponents/joinBannerFl";
import JoinBannerFr from "./bannerComponents/joinBannerFr";
import "./joinBanner.less";
const JoinBanner = () => {
  return (
    <div className="join_banner">
      <div className="join_banner_inner">
        <JoinBannerFl />
        <JoinBannerFr />
      </div>
    </div>
  );
};
export default JoinBanner;
