import React, { useState } from "react";
import NoAccount from "./noAccount";
import Account from "./account";
type Phase = "none" | "setup" | "shop" | "battle" | "result";
const AccountBtn = (props: { btnOnly?: boolean; receivePns?: boolean }) => {
  const { btnOnly, receivePns } = props;
  const [phase, setPhase] = useState<Phase>(
    (window.localStorage.getItem("PolkadotAccount_TSX_phase") as Phase) ||
      "none"
  );
  const connectWallet = () => {
    setPhase("setup");
    window.localStorage.setItem("PolkadotAccount_TSX_phase", "setup");
  };
  return phase === "setup" ? (
    <Account btnOnly={btnOnly} receivePns={receivePns} />
  ) : (
    <NoAccount connectWallet={connectWallet} />
  );
};
export default AccountBtn;
