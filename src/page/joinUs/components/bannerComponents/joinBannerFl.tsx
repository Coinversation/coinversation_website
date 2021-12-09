// import React,{useState} from "react";
import React, { useContext } from "react";
import "./joinBannerFl.less";

import { LastBlockContext } from "../context/LastParachainData";
import NowTime from "./time/nowTime";
import BlockTime from "./time/blockTime";
import AccountBtn from "./accountBtn";
const JoinBannerFl = () => {
  const lastBlockContext = useContext(LastBlockContext);

  return (
    <div className="join_bannerFl">
      {!lastBlockContext?.latestBlock ? <NowTime /> : null}

      {lastBlockContext?.latestBlock ? (
        <BlockTime
          last={+lastBlockContext.lastBlock}
          latest={+lastBlockContext.latestBlock}
        />
      ) : null}
      <AccountBtn />
    </div>
  );
};
export default JoinBannerFl;
