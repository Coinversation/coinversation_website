import React, { useEffect, createContext, useContext } from "react";
import { getBlock } from "../../server/api";
import { ApiRxContext } from "../../context";
export interface ILastBlockContextType {
  latestBlock: number;
  // lastBlock: number;
}

export const LastBlockContextSet = createContext<React.Dispatch<
  React.SetStateAction<number | null>
> | null>(null);
export const useLastBlockContextSet = () => {
  const setter = useContext(LastBlockContextSet);
  if (!setter) {
    throw new Error("LastBlockContextSet null");
  }
  return setter;
};

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
        console.log("latestBlock: ", _latestBlock.number);
      }
    })();
  }, [api]);

  return (
    <LastBlockContext.Provider value={{ latestBlock: latestBlock }}>
      <LastBlockContextSet.Provider value={setLatestBlock}>
        {children}
      </LastBlockContextSet.Provider>
    </LastBlockContext.Provider>
  );
}
