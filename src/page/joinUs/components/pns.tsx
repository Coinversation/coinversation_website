import React, { useEffect, useState, useContext } from "react";
import AccountBtn from "./bannerComponents/accountBtn";
import { AccountContext } from "../context/AccountContext";
import { ContributeDataContext } from "../context/ContributeData";
import "./pns.less";
const PNS = () => {
  const [receivePns, setReceivePns] = useState(false);
  const parachainData = useContext(ContributeDataContext);
  const currentAccount = useContext(AccountContext);
  useEffect(() => {
    if (currentAccount && parachainData?.total) {
      (async () => {
        setReceivePns(+parachainData.total > 5);
      })();
    }
  }, [currentAccount, parachainData]);
  return (
    <div className="pns">
      <h2 className="_h2">PNS</h2>
      {/* <img src={require("./img/icon_pns.svg")} alt="" /> */}
      <p className="_p">
        Polkadot Name System (PNS) is a decentralized domain name system in the
        Polkadot ecosystem. You can use a .dot domain name to support smart
        contracts, domain names, wallets, and NFTs, etc., On PNS, you can create
        your own Web 3.0 name card, using a domain name that you fully possess
        and manage. Top 1000 participants who contribute more than 10 DOT to the
        Coinversation Crowdloan via Coinversation can earn a Polkadot domain
        name (.dot) for free after verification.
        {currentAccount.sortAddress ? (
          <i>
            {currentAccount.sortAddress}
            <em>{!receivePns ? "(Unmet eligibility)" : ""}</em>
          </i>
        ) : null}
      </p>
      <div className="btn">
        <AccountBtn btnOnly={true} receivePns={receivePns} />
      </div>
    </div>
  );
};
export default PNS;
