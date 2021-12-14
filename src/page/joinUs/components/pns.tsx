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
        As long as each user supports Coinversation with a minimum of 10 DOTs in
        the crowd loan, they can go to the PNS page to register their own
        exclusive Polkadot domain name for free. The first 1000 users who have
        completed the domain name registration can also directly bind and use it
        for free.
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
