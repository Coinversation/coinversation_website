import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Account } from "./types";

export const setupExtension = async () => {
  const extensions = await web3Enable("polkadot-js/apps");
  if (extensions.length === 0) {
    return {
      kind: "ng" as const,
      message: "Please install Polkadot{.js} extension and try again.",
    };
  }
  const injectedAccounts = await web3Accounts();
  if (injectedAccounts.length === 0) {
    return {
      kind: "ng" as const,
      message:
        "Please add at least one account on the Polkadot{.js} extension and try again.",
    };
  }
  return {
    kind: "ok" as const,
    injectedAccounts,
  };
};
export const setupAccounts = async (account: Account | null) => {
  const ext = await setupExtension();
  if (ext.kind === "ng") {
    return ext;
  }
  const injectedAccounts = ext.injectedAccounts;
  return {
    kind: "ok" as const,
    injectedAccounts,
  };
};
