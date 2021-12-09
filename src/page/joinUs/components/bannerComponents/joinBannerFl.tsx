// import React,{useState} from "react";
import React, { useEffect, useState, useContext } from "react";
import "./joinBannerFl.less";
import NoAccount from "./noAccount";
import Account from "./account";
import { getBlock } from "../../server/api";
import { ApiRxContext } from "../../context";
import { LastBlockContext } from "../context/LastParachainData";
import NowTime from "./time/nowTime";
import BlockTime from "./time/blockTime";
type Phase = "none" | "setup" | "shop" | "battle" | "result";

const JoinBannerFl = (props: { account: string }) => {
  const lastBlockContext = useContext(LastBlockContext);
  const [phase, setPhase] = useState<Phase>(
    (window.localStorage.getItem("PolkadotAccount_TSX_phase") as Phase) ||
      "none"
  );
  const connectWallet = () => {
    setPhase("setup");
    window.localStorage.setItem("PolkadotAccount_TSX_phase", "setup");
  };
  const { api } = useContext(ApiRxContext);

  useEffect(() => {
    (async () => {
      if (api) {
        const block = await getBlock("latest");
        console.log(block);
      }
    })();
  }, [api]);

  return (
    <div className="join_bannerFl">
      {!lastBlockContext?.lastBlock ? <NowTime /> : null}

      {lastBlockContext?.lastBlock ? (
        <BlockTime
          last={+lastBlockContext.lastBlock}
          latest={+lastBlockContext.latestBlock}
        />
      ) : null}
      {phase === "setup" ? (
        <Account />
      ) : (
        <NoAccount connectWallet={connectWallet} />
      )}
    </div>
  );
};
export default JoinBannerFl;
