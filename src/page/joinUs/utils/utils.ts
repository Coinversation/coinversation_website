import BN from "bn.js";
import type { Signer } from "@polkadot/api/types";
import type { SignerOptions } from "@polkadot/api/submittable/types";
import type { IKeyringPair } from "@polkadot/types/types";
// import type { RegistryTypes } from "@polkadot/types/types/registry";
import { ProviderInterface } from "@polkadot/rpc-provider/types";
import { Observable } from "rxjs";
import envs from "./envs.json";
import * as definitions from "./interfaces/definitions";
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
export function sortName(name: string) {
  return `${name.slice(0, 7)}...${name.slice(name.length - 4, name.length)}`;
}
export function getGrandPrizePool(addressNum: number) {
  let num = 60000;
  let max_add = 2000;
  if (addressNum) {
    if (addressNum < 2000) {
    } else if (addressNum < 4000) {
      num = num * 2;
      max_add = 4000;
    } else {
      num = num * (addressNum / 2000);
      max_add = 6000;
    }
  }
  return [num, formatNumber(`${num}`), max_add];
}
function formatNumber(n: string) {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) {
    return b;
  }
  var r = len % 3;
  return r > 0
    ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",")
    : b.slice(r, len).match(/\d{3}/g).join(",");
}
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
