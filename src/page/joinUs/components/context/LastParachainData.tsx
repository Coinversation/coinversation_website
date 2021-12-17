import React, { useEffect } from "react";
import { getBlock } from "../../server/api";
import { ApiRxContext } from "../../context";
export interface ILastBlockContextType {
  latestBlock: number;
  // lastBlock: number;
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
        const _latestBlock = await getBlock("latest");
        setLatestBlock(+_latestBlock.number);
      }
    })();
  }, [api]);

  return (
    <LastBlockContext.Provider value={{ latestBlock: latestBlock }}>
      {children}
    </LastBlockContext.Provider>
  );
}
