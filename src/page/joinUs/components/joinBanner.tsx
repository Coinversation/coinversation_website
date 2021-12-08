// import React from "react";
import React, { useState } from "react";
import JoinBannerFl from "./bannerComponents/joinBannerFl";
import JoinBannerFr from "./bannerComponents/joinBannerFr";
import {
  LastParachainData,
  LastParachainDataSet,
} from "./context/JoinBannerProvider";
import "./joinBanner.less";
const JoinBanner = () => {
  const [lastParachainBlock, setLastParachainBlock] = useState();
  return (
    <div className="join_banner">
      <div className="join_banner_inner">
        <LastParachainData.Provider value={lastParachainBlock}>
          <LastParachainDataSet.Provider value={setLastParachainBlock}>
            <JoinBannerFl account={""} />
          </LastParachainDataSet.Provider>
        </LastParachainData.Provider>
        <JoinBannerFr />
      </div>
    </div>
  );
};
export default JoinBanner;
