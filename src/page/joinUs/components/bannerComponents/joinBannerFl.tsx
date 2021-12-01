import React from "react";
import Tips from "@/components/tips/tipsWidget";
import "./joinBannerFl.less";
import NoAccount from "./noAccount";
import Account from "./account";
const JoinBannerFl = (props: { account: string }) => {
  const { account } = props;
  return (
    <div className="join_bannerFl">
      <h3>5000</h3>
      <p>
        Completion Block
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </p>

      <h3>20:18:07</h3>
      <p>
        Countdown
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </p>

      {account ? <NoAccount /> : <Account />}
    </div>
  );
};
export default JoinBannerFl;
