import React, { useEffect, useState, useContext } from "react";
import Tips from "@/components/tips/tipsWidget";
import "./joinBannerFl.less";
import NoAccount from "./noAccount";
import Account from "./account";
import { getBlock } from "../../server/api";
import { ApiRxContext } from "../../context";
type Phase = "none" | "setup" | "shop" | "battle" | "result";

const JoinBannerFl = (props: { account: string }) => {
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
      <h3>5000</h3>
      <div className="text_p">
        <p>Comdivletion Block</p>
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </div>

      <h3>20:18:07</h3>
      <div className="text_p">
        <p> Countdown</p>
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </div>

      {phase === "setup" ? (
        <Account />
      ) : (
        <NoAccount connectWallet={connectWallet} />
      )}
    </div>
  );
};
export default JoinBannerFl;
