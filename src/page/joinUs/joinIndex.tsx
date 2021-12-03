import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import Height from "@/components/height/heightWidget";
import JoinBanner from "./components/joinBanner";
import Process from "./components/process";
import { ThemeProvider } from "styled-components";
import ListOfWinners from "./components/listOfWinners";
import "./joinIndex.less";
import { ApiContext } from "@polkadot/react-api";
import { ApiProps } from "@polkadot/react-api/types";
// import { jest } from "@types/jest";
import {
  ApiRxContextProvider,
  SystemContextProvider,
  SystemContext,
} from "./context";
import { TypeRegistry } from "@polkadot/types/create";
import { WsProvider } from "@polkadot/api";
import { POLKADOT_GENESIS } from "@polkadot/apps-config";
const WS_PROVIDER = new WsProvider("wss://rpc.plasmnet.io/");
function aGenesisHash() {
  return new TypeRegistry().createType("Hash", POLKADOT_GENESIS);
}
export const lightTheme: any = {
  theme: "light",
};

const propose = jest.fn().mockReturnValue("mockProposeExtrinsic");
const mockApi: ApiProps = {
  api: {
    derive: {
      accounts: {
        info: () =>
          Promise.resolve(() => {
            /**/
          }),
      },
    },
    genesisHash: aGenesisHash(),
    query: {},
    registry: { chainDecimals: [12], chainTokens: ["Unit"] },
    tx: {
      council: {
        propose,
      },
    },
  },
  systemName: "substrate",
} as unknown as ApiProps;
export default function JoinIndex() {
  return (
    <div className="joinIndex">
      <HeaderWidget propsOnKey="ParachainA" />
      <div className="joinIndex_inner">
        <ThemeProvider theme={lightTheme}>
          <ApiContext.Provider value={mockApi}>
            <ApiRxContextProvider provider={WS_PROVIDER}>
              <h1>ssss</h1>
              {/* <SystemContextProvider provider={WS_PROVIDER}>
            <SystemContext.Consumer>
              {(isSystemReady) => {
                return (
                  isSystemReady && (
                    <div className="joinIndex_inner_inner">
                    <Height height={60} />
                      <JoinBanner />
                      <Height height={40} />
                      <Process />
                      <Height height={40} />
                      <ListOfWinners />
                      <Height height={60} /> 
                    </div>
                  )
                );
              }}
            </SystemContext.Consumer>
          </SystemContextProvider>*/}
            </ApiRxContextProvider>
          </ApiContext.Provider>
        </ThemeProvider>
      </div>
      <FooterWidget />
    </div>
  );
}
