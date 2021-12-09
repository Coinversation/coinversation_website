import React, { useEffect } from "react";
import { getBlock, getContributeLast } from "../../server/api";
import { ApiRxContext } from "../../context";
export interface ILastBlockContextType {
  latestBlock: number;
  lastBlock: number;
}

export const LastBlockContext: React.Context<ILastBlockContextType> =
  React.createContext({} as ILastBlockContextType);
export function LastParachainData(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const { children = null } = props;
  const [latestBlock, setLatestBlock] = React.useState<number>(0);
  const [lastBlock, setLastBlock] = React.useState<number>();
  const { api } = React.useContext(ApiRxContext);

  useEffect(() => {
    (async () => {
      const contributeLast = await getContributeLast();
      if (contributeLast === lastBlock) {
        return;
      }
      setLastBlock(contributeLast);
      if (api) {
        const _latestBlock = await getBlock("latest");
        setLatestBlock(+_latestBlock.number);
        setLastBlock(contributeLast);
        setInterval(() => {
          (async () => {
            const contributeLast = await getContributeLast();
            if (contributeLast === lastBlock) {
              return;
            }
            const _latestBlock = await getBlock("latest");
            setLatestBlock(+_latestBlock.number);
            setLastBlock(contributeLast);
          })();
        }, 12000);
      }
    })();
  }, [api, lastBlock]);

  return (
    <LastBlockContext.Provider
      value={{ latestBlock: latestBlock, lastBlock: lastBlock }}
    >
      {children}
    </LastBlockContext.Provider>
  );
}
