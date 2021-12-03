import React, { useEffect, useState } from "react";
import { ApiRx } from "@polkadot/api";
import { DeriveFees } from "@polkadot/api-derive/types";
import { EraIndex } from "@polkadot/types/interfaces";
import { logger } from "@polkadot/util";
import { take } from "rxjs/operators";
import { ApiRxContextProviderProps } from "@substrate/context/lib/types";
import { useDidUpdataEffexct } from "../utils/utils";
import { useApi, useCall } from "@polkadot/react-hooks";
export interface ApiRxContextType {
  api: ApiRx;
  bondingDuration?: EraIndex;
  fees?: DeriveFees;
  isApiReady: boolean;
}

const l = logger("api-context");

export const ApiRxContext: React.Context<ApiRxContextType> =
  React.createContext({} as ApiRxContextType);

export function ApiRxContextProvider(
  props: ApiRxContextProviderProps
): React.ReactElement {
  const { children = null, provider } = props;
  const [apiRx, setApiRx] = useState<ApiRx>(new ApiRx({ provider }));
  // const { api } = useApi();
  const [bondingDuration, setBindingDuration] = useState<EraIndex>();
  const [fees, setFees] = useState<DeriveFees>();
  const [isReady, setIsReady] = useState(false);
  useDidUpdataEffexct(() => {
    // setApiRx(new ApiRx({ provider }));
    setIsReady(false);
  }, [provider]);
  useEffect(() => {
    const subscription = apiRx.isReady.subscribe(() => {
      l.log("api is ready");
      setIsReady(true);
    });
    return (): void => subscription.unsubscribe();
  }, [apiRx.isReady]);
  useEffect(() => {
    if (isReady) {
      // const subscription = apiRx.derive.balances
      //   .fees()
      //   .pipe(take(1))
      //   .subscribe((deriveFees) => {
      //     setFees(deriveFees);
      //   });
      // console.log(api.query.crowdloan);
      // const duration = apiRx.consts.staking.bondingDuration;
      // setBindingDuration(duration);
      // return (): void => subscription.unsubscribe();
    }
  }, [isReady]);
  return (
    <ApiRxContext.Provider
      value={{ api: apiRx, bondingDuration, fees, isApiReady: isReady }}
    >
      {children}
    </ApiRxContext.Provider>
  );
}
