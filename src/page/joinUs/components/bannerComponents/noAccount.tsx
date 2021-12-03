import React, { FC } from "react";
import "./noAccount.less";
const NoAccount: FC<{ connectWallet: () => void }> = ({ connectWallet }) => {
  return (
    <button className="noAccount_button" onClick={connectWallet}>
      Connect Wallet
    </button>
  );
};
export default NoAccount;
