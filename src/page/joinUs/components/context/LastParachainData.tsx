import React, { useEffect } from "react";
import { getBlock, getContributeLast } from "../../server/api";
import { ApiRxContext } from "../../context";
export interface ILastBlockContextType {
  latestBlock: string;
  lastBlock: string;
}

export const LastBlockContext: React.Context<ILastBlockContextType> =
  React.createContext({} as ILastBlockContextType);
export function LastParachainData(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const { children = null } = props;
  const [latestBlock, setLatestBlock] = React.useState<string>();
  const [lastBlock, setLastBlock] = React.useState<string>();
  const { api } = React.useContext(ApiRxContext);

  useEffect(() => {
    if (api) {
      setInterval(() => {
        (async () => {
          const contributeLast = await getContributeLast();
          if (contributeLast === lastBlock) {
            return;
          }
          const _latestBlock = await getBlock("latest");
          console.log({ _latestBlock, contributeLast });
          setLatestBlock(_latestBlock.number);
          setLastBlock(contributeLast);
        })();
      }, 12000);
    }
  }, [api, lastBlock]);

  return (
    <LastBlockContext.Provider
      value={{ latestBlock: latestBlock, lastBlock: lastBlock }}
    >
      {children}
    </LastBlockContext.Provider>
  );
}
