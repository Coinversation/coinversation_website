import React, { createContext, useState, useContext } from "react";

type Phase = "none" | "setup" | "shop" | "battle" | "result";
export const ConnectWalletContext = createContext<Phase>(
  (window.localStorage.getItem("PolkadotAccount_TSX_phase") as Phase) || "none"
);

export const useConnectWalletContext = () => {
  const _state = useContext(ConnectWalletContext);
  if (!_state) {
    throw new Error("ConnectWalletContext null");
  }
  return _state;
};

export const ConnectWalletContextSet = createContext<() => void>(null);

export const useConnectWalletContextSet = () => {
  const _state = useContext(ConnectWalletContextSet);
  if (!_state) {
    throw new Error("ConnectWalletContextSet null");
  }
  return _state;
};

export function ConnectWalletProvider(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const [phase, setPhase] = useState<Phase>(
    (window.localStorage.getItem("PolkadotAccount_TSX_phase") as Phase) ||
      "none"
  );
  const connectWallet = () => {
    setPhase("setup");
    window.localStorage.setItem("PolkadotAccount_TSX_phase", "setup");
  };
  const { children } = props;
  return (
    <ConnectWalletContext.Provider value={phase}>
      <ConnectWalletContextSet.Provider value={connectWallet}>
        {children}
      </ConnectWalletContextSet.Provider>
    </ConnectWalletContext.Provider>
  );
}
