import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import { LastBlockContext } from "../components/context/LastParachainData";
import { AccountContext } from "./AccountContext";
import {
  getContributeList,
  getContributeTotal,
  getMyContribute,
} from "../server/api";
import config from "@/config";
interface IContributeDataType {
  count: number;
  list: any[];
  total: number; // DOT to Contribute
  alltotal: number;
  lastBlock: number;
}
export const ContributeDataContext: React.Context<IContributeDataType> =
  React.createContext({} as IContributeDataType);

export function ContributeDataContextProvider(props: {
  children?: React.ReactElement;
}): React.ReactElement {
  const lastBlockContext = useContext(LastBlockContext);
  const { latestBlock } = lastBlockContext;
  const { children = null } = props;
  const currentAccount = useContext(AccountContext);
  const [count, setCount] = useState<number>();
  const [list, setList] = useState<any[]>();
  const [total, setTotal] = useState<number>();
  const [alltotal, setAlltotal] = useState<number>();
  const [lastBlock, setLastBlock] = React.useState<number>(0);
  const timer = useRef<NodeJS.Timer>();
  const [bol, setBol] = useState<boolean>(false);
  useEffect(() => {
    if (bol) {
      return;
    }
    setBol(true);
    console.log(bol, latestBlock, lastBlock, currentAccount);
    if (list === undefined) {
      (async () => {
        const list = await getContributeList();
        setList(list ?? []);
        if (list.length) {
          console.log("setLastBlock", +list[list.length - 1].blockNum);
          setLastBlock(+list[list.length - 1].blockNum);
        }
        const resAlltotal = await getContributeTotal();
        setAlltotal(resAlltotal.totalStakedFromPage);
        setCount(resAlltotal.totalAddressesFromPage);
        if (currentAccount && currentAccount.publickey) {
          console.log("ccc1111");
          const resMy = await getMyContribute(currentAccount?.publickey);
          setTotal(resMy);
        }
        setBol(false);
      })();
    }

    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(async () => {
      if (!latestBlock) {
        return;
      }
      const _remain = config.maxBlock - (+latestBlock - +lastBlock);
      if (_remain < 0) {
        return;
      }
      if (latestBlock <= lastBlock) {
        return;
      }
      console.log("lastBlock", latestBlock, lastBlock);
      const list = await getContributeList();
      setList(list);
      if (list.length) {
        console.log("setLastBlock", +list[list.length - 1].blockNum);
        setLastBlock(+list[list.length - 1].blockNum);
      }
      const resAlltotal = await getContributeTotal();
      setAlltotal(resAlltotal.totalStakedFromPage);
      setCount(resAlltotal.totalAddressesFromPage);
      if (currentAccount && currentAccount.publickey) {
        const res = await getMyContribute(currentAccount?.publickey);
        setTotal(res);
      }
    }, 3000);
    return () => {
      clearTimeout(timer.current);
    };
  }, [bol, latestBlock, list, lastBlock, currentAccount]);
  return (
    <ContributeDataContext.Provider
      value={{
        count: count,
        list: list,
        total: total,
        alltotal: alltotal,
        lastBlock: lastBlock,
      }}
    >
      <ContributeDataContextSetCount.Provider value={setCount}>
        <ContributeDataContextSetList.Provider value={setList}>
          <ContributeDataContextSetTotal.Provider value={setTotal}>
            <ContributeDataContextSetAllTotal.Provider value={setAlltotal}>
              <LastBlockContextSet.Provider value={setLastBlock}>
                {children}
              </LastBlockContextSet.Provider>
            </ContributeDataContextSetAllTotal.Provider>
          </ContributeDataContextSetTotal.Provider>
        </ContributeDataContextSetList.Provider>
      </ContributeDataContextSetCount.Provider>
    </ContributeDataContext.Provider>
  );
}
export const ContributeDataContextSetCount = createContext<React.Dispatch<
  React.SetStateAction<number | null>
> | null>(null);
export const useContributeDataContextSetCount = () => {
  const setter = useContext(ContributeDataContextSetCount);
  if (!setter) {
    throw new Error("ContributeDataContextSetCount null");
  }
  return setter;
};

export const ContributeDataContextSetList = createContext<React.Dispatch<
  React.SetStateAction<any[] | null>
> | null>(null);
export const useContributeDataContextSetList = () => {
  const setter = useContext(ContributeDataContextSetList);
  if (!setter) {
    throw new Error("ContributeDataContextSetList null");
  }
  return setter;
};

export const ContributeDataContextSetTotal = createContext<React.Dispatch<
  React.SetStateAction<number | null>
> | null>(null);
export const useContributeDataContextSetTotal = () => {
  const setter = useContext(ContributeDataContextSetTotal);
  if (!setter) {
    throw new Error("ContributeDataContextSetTotal null");
  }
  return setter;
};

export const ContributeDataContextSetAllTotal = createContext<React.Dispatch<
  React.SetStateAction<number | null>
> | null>(null);
export const useContributeDataContextSetAllTotal = () => {
  const setter = useContext(ContributeDataContextSetAllTotal);
  if (!setter) {
    throw new Error("ContributeDataContextSetAllTotal null");
  }
  return setter;
};

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
