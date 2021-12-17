import React, { useEffect } from "react";
import { ApiRxContext } from "../../context";
export interface ILastBlockContextType {
  latestBlock: number;
}
export const LastBlockContext: React.Context<ILastBlockContextType> =
  React.createContext({} as ILastBlockContextType);

export function LastParachainData(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const { children = null } = props;
  const [latestBlock, setLatestBlock] = React.useState<number>(0);
  const { api } = React.useContext(ApiRxContext);

  useEffect(() => {
    (async () => {
      if (api) {
        await api.rpc.chain.subscribeNewHeads((header) => {
          setLatestBlock(header.number.toNumber());
        });
      }
    })();
  }, [api]);

  return (
    <LastBlockContext.Provider value={{ latestBlock: latestBlock }}>
      {children}
    </LastBlockContext.Provider>
  );
}
