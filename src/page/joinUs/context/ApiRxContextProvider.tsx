import React, { useEffect, useState } from "react";
import { ApiPromise } from "@polkadot/api";
import { DeriveFees } from "@polkadot/api-derive/types";
import { connect } from "../server/api";
export interface ApiRxContextType {
  fees?: DeriveFees;
  isApiReady: boolean;
  api: ApiPromise | null;
}

export const ApiRxContext: React.Context<ApiRxContextType> =
  React.createContext({} as ApiRxContextType);

export function ApiRxContextProvider(props: {
  children?: React.ReactElement;
  provider: string;
}): React.ReactElement {
  const { children = null, provider } = props;
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      const _api = await connect(provider);
      setApi(_api);
      setIsReady(true);
    })();
  }, [provider]);
  return (
    <ApiRxContext.Provider value={{ api: api, isApiReady: isReady }}>
      {children}
    </ApiRxContext.Provider>
  );
}
