import React from "react";
import "./workflow.less";
export default function Workflow() {
  return (
    <div className="workflow" id="Workflow">
      <div className="partone">
        <div className="partone_inner">
          <h2>
            Para<i>chain</i>
          </h2>
          <p className="text">
            Coinversation will reserve 22.5% of the tokens for the Polkadot
            Parachain auction. This parachain will be used for the NFT and
            financial derivatives ecology, a scalable NFT protocol and financial
            derivatives platform based on Substrate.
          </p>
        </div>
      </div>
      {/* <div className="parttwo">
        <h2>System Workflow</h2>
        <p className="text">
          The initial collateral includes CTO and DOT, and the collateralization
          ratio is 800% and 500% respectively. In the future, the collateral and
          collateralization ratio can be adjusted through community governance.
          When users stake collaterals and forge synthetic assets, corresponding
          debts are generated. When the user wants to unlock the collateral, he
          must repay the debt, that is, destroy the previously generated
          synthetic assets.
        </p>
      </div>
      <div className="parttwo_bg">
        <img src={require("../img/workflow_bg_two.png")} alt="logo" />
      </div> */}
    </div>
  );
}
