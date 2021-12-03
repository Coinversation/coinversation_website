import BN from "bn.js";
import type { Signer } from "@polkadot/api/types";
import type { SignerOptions } from "@polkadot/api/submittable/types";
import type { IKeyringPair } from "@polkadot/types/types";
// import type { RegistryTypes } from "@polkadot/types/types/registry";
import { ProviderInterface } from "@polkadot/rpc-provider/types";
import { Observable } from "rxjs";
import envs from "./envs.json";
import * as definitions from "./interfaces/definitions";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";
type EnvNames = keyof typeof envs;
export const getEnv = (envName: any) => {
  if (!envName) {
    throw new Error(`no envName: ${envName}`);
  }
  const env = envs[envName as EnvNames];
  if (!env) {
    throw new Error(`undefined env: ${envName}`);
  }
  return env;
};

export function providerConnected(
  provider: ProviderInterface
): Observable<boolean> {
  return new Observable((subscriber) => {
    if (provider.isConnected) {
      subscriber.next(true);
    } else {
      subscriber.next(false);
    }
  });
}
export function useDidUpdataEffexct(
  fn: EffectCallback,
  inputs?: DependencyList
): void {
  const didMountRef = useRef(false);
  return useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}
export const buildTypes = () => {
  const types: any = {
    AccountInfo: "AccountInfoWithDualRefCount",
  };
  for (const [n, t] of Object.values(definitions).flatMap((d) =>
    Object.entries(d.types)
  )) {
    types[n] = t;
  }
  return types;
};

export type KeyringPairOrAddressAndSigner =
  | IKeyringPair
  | { addrss: string; signer: Signer };

export const extractTxArgs = (
  account: KeyringPairOrAddressAndSigner,
  powSolution?: BN
) => {
  let pairOrAddress: IKeyringPair | string;
  const options: Partial<SignerOptions> = {};
  if ("signer" in account) {
    pairOrAddress = account.addrss;
    options.signer = account.signer;
  } else {
    pairOrAddress = account;
  }
  if (powSolution) {
    options.tip = new BN(1).shln(127).add(powSolution);
  }
  return [pairOrAddress, options] as const;
};

export const withToggleAsync = async <T>(
  toggle: (b: boolean) => void,
  main: () => Promise<T>
) => {
  toggle(true);
  const result = await main();
  toggle(false);
  return result;
};
