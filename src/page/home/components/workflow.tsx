import React from "react";
import "./workflow.less";

export default function Workflow() {
  return (
    <div className="workflow">
      <div className="partone" id="Parachain">
        <div
          className="partone_inner  animate animate__animated"
          data-animate="animate__fadeIn"
        >
          <h2>Parachain</h2>
          <p className="text">
            Coinversation will reserve 22.5% of the tokens for the Polkadot
            Parachain auction. This parachain will be used for the NFT and
            financial derivatives ecology, a scalable NFT protocol and financial
            derivatives platform based on Substrate.
          </p>
        </div>
      </div>
      <div className="parttwo" id="Workflow">
        <div className="parttwo_inner">
          <div
            className="partone_inner  animate animate__animated"
            data-animate="animate__fadeInUp"
          >
            <h2>
              System <i>Workflow</i>
            </h2>
            <p className="text">
              Based on the stablecoin protocol of interest-bearing assets built
              on the Polkadot, using $DOT and $CTO issued by Coinversation to
              generate interest-bearing tokens, CUSD is synthesized through
              smart contracts and oracles. Users can mint CUSD by
              collateralizing tokens that can generate interest, such as CTO and
              DOT. Bridging USDT, USDC, and BUSD to the Coinversation to form
              the largest stable currency exchange platform in the Polkadot
              ecosystem. We will open the API to facilitate all parachains to
              access our stable currency exchange system and facilitate all
              chains users can seamlessly use Polkadot's cross-chain protocol.
            </p>
          </div>
          <div className="parttwo_bg">
            <img src={require("../img/workflow_bg_two.svg")} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
