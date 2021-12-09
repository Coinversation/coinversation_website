import React, { useState } from "react";
import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import Height from "@/components/height/heightWidget";
import JoinBanner from "./components/joinBanner";
import Process from "./components/process";
import ListOfWinners from "./components/listOfWinners";
import PNS from "./components/pns";
import "./joinIndex.less";
import {
  ApiRxContextProvider,
  AccountContext,
  mInjectedAccountWithMeta,
  AccountSetterContext,
  AllAccountsSetterContext,
  AllAccounts,
} from "./context";
import { ContributeDataContextProvider } from "./context/ContributeData";
// const WS_PROVIDER = new WsProvider("wss://rpc.plasmnet.io/");

const WS_PROVIDER = "wss://rpc.polkadot.io";

export default function JoinIndex() {
  const [account, setAccount] = useState<mInjectedAccountWithMeta | null>({
    address: "",
    meta: {
      genesisHash: "",
      name: "",
      source: "",
    },
    type: "ed25519",
    publickey: "",
    shidenAddress: "",
    sortAddress: "",
  });
  const [allAccounts, setAllAccounts] = useState<mInjectedAccountWithMeta[]>(
    []
  );
  return (
    <div className="joinIndex">
      <HeaderWidget propsOnKey="ParachainA" />
      <div className="joinIndex_inner">
        <ApiRxContextProvider provider={WS_PROVIDER}>
          <AccountContext.Provider value={account}>
            <AllAccounts.Provider value={allAccounts}>
              <AllAccountsSetterContext.Provider value={setAllAccounts}>
                <AccountSetterContext.Provider value={setAccount}>
                  <ContributeDataContextProvider>
                    <div className="joinIndex_inner_inner">
                      <Height height={60} />
                      <JoinBanner />
                      <Height height={40} />
                      <Process />
                      <Height height={40} />
                      <ListOfWinners />
                      <Height height={40} />
                      <PNS />
                      <Height height={60} />
                    </div>
                  </ContributeDataContextProvider>
                </AccountSetterContext.Provider>
              </AllAccountsSetterContext.Provider>
            </AllAccounts.Provider>
          </AccountContext.Provider>
        </ApiRxContextProvider>
      </div>
      <FooterWidget />
    </div>
  );
}
