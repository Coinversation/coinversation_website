import React from "react";
import NoAccount from "./noAccount";
import Account from "./account";
import {
  useConnectWalletContext,
  useConnectWalletContextSet,
} from "../../context";
// type Phase = "none" | "setup" | "shop" | "battle" | "result";
const AccountBtn = (props: { btnOnly?: boolean; receivePns?: boolean }) => {
  const { btnOnly, receivePns } = props;
  // const [phase, setPhase] = useState<Phase>(
  //   (window.localStorage.getItem("PolkadotAccount_TSX_phase") as Phase) ||
  //     "none"
  // );
  // const connectWallet = () => {
  //   setPhase("setup");
  //   window.localStorage.setItem("PolkadotAccount_TSX_phase", "setup");
  // };
  const phase = useConnectWalletContext();
  const connectWallet = useConnectWalletContextSet();
  return phase === "setup" ? (
    <Account btnOnly={btnOnly} receivePns={receivePns} />
  ) : (
    <NoAccount connectWallet={connectWallet} />
  );
};
export default AccountBtn;
