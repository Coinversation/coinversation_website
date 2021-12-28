import React from "react";
import JoinBannerFl from "./bannerComponents/joinBannerFl";
import JoinBannerFr from "./bannerComponents/joinBannerFr";
import "./joinBanner.less";
const JoinBanner = () => {
  return (
    <div className="join_banner">
      <div className="join_banner_inner">
        <h2 className="join_banner_inner_warn">
          During a countdown of about 15 minutes (150 block height), if user A
          participates in the activity in the last 1 second, the countdown will
          be reset to the initial 15 minutes. If there is no new voting record
          in the next 15 minutes (150 block height), user A will win the
          qualification to share the reward.
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
