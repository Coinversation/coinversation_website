import React, { useState, useEffect, useContext, createContext } from "react";
import { LastBlockContext } from "../components/context/LastParachainData";
import { AccountContext } from "./AccountContext";
import { getContributeList } from "../server/api";
interface IContributeDataType {
  count: number;
  list: any[];
  total: number; // DOT to Contribute
  alltotal: number;
}
export const ContributeDataContext: React.Context<IContributeDataType> =
  React.createContext({} as IContributeDataType);

export function ContributeDataContextProvider(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const [lastM, setLastM] = useState<string>();
  const lastBlockContext = useContext(LastBlockContext);
  const { lastBlock: last, latestBlock: latest } = lastBlockContext;
  const { children = null } = props;
  const currentAccount = useContext(AccountContext);
  const [data, setData] = useState<IContributeDataType>();

  useEffect(() => {
    const _remain = 6000 - (+latest - +last);
    if (_remain < 0) {
      return;
    }
    if (+lastM === last) {
      return;
    }
    (async () => {
      setLastM(`${last}`);
      const res = await getContributeList(currentAccount?.publickey);
      setData(res);
    })();
  }, [last, latest, lastM, currentAccount]);
  return (
    <ContributeDataContext.Provider
      value={{
        ...data,
      }}
    >
      <ContributeDataContextSet.Provider value={setData}>
        {children}
      </ContributeDataContextSet.Provider>
    </ContributeDataContext.Provider>
  );
}
export const ContributeDataContextSet = createContext<React.Dispatch<
  React.SetStateAction<IContributeDataType | null>
> | null>(null);
export const useContributeDataContextSet = () => {
  const setter = useContext(ContributeDataContextSet);
  if (!setter) {
    throw new Error("ContributeDataContextSet null");
  }
  return setter;
};
