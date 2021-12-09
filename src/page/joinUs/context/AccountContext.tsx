import { createContext, useContext } from "react";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
export interface mInjectedAccountWithMeta extends InjectedAccountWithMeta {
  publickey?: string;
  shidenAddress?: string;
  sortAddress?: string;
}
export const AccountContext = createContext<mInjectedAccountWithMeta | null>(
  null
);
export const useAccount = () => {
  const account = useContext(AccountContext);
  if (!account) {
    throw new Error("AccountContext null");
  }
  return account;
};

export const AllAccounts = createContext<mInjectedAccountWithMeta[] | null>(
  null
);
export const useAllAccounts = () => {
  const account = useContext(AllAccounts);
  if (!account) {
    throw new Error("AllAccounts null");
  }
  return account;
};

export const AllAccountsSetterContext = createContext<React.Dispatch<
  React.SetStateAction<mInjectedAccountWithMeta[] | null>
> | null>(null);
export const useAllAccountsSetter = () => {
  const setter = useContext(AllAccountsSetterContext);
  if (!setter) {
    throw new Error("AccountSetterContext null");
  }
  return setter;
};

export const AccountSetterContext = createContext<React.Dispatch<
  React.SetStateAction<mInjectedAccountWithMeta | null>
> | null>(null);
export const useAccountSetter = () => {
  const setter = useContext(AccountSetterContext);
  if (!setter) {
    throw new Error("AccountSetterContext null");
  }
  return setter;
};
