import React, { useEffect, useState, useContext } from "react";
import AccountBtn from "./bannerComponents/accountBtn";
import { AccountContext } from "../context/AccountContext";
import { getReceivePns } from "../server/api";
import "./pns.less";
const PNS = () => {
  const [receivePns, setReceivePns] = useState(false);
  const currentAccount = useContext(AccountContext);
  useEffect(() => {
    if (currentAccount) {
      (async () => {
        const res = await getReceivePns(currentAccount.publickey);
        setReceivePns(res);
      })();
    }
  }, [currentAccount]);
  return (
    <div className="pns">
      <h2 className="_h2">PNS</h2>
      {/* <img src={require("./img/icon_pns.svg")} alt="" /> */}
      <p className="_p">
        Here is the text of the eventHere’s the program. The programnumber of
        CTO awards increases with the number of pledges made by DOT. For every
        1,000 DO
      </p>
      <div className="btn">
        <AccountBtn btnOnly={true} receivePns={receivePns} />
      </div>
    </div>
  );
};
export default PNS;
