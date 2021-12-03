import { setupAccounts } from "../utils/accountUtils";
import { Account } from "../utils/types";

export const withToggleAsync = async <T>(
  toggle: (b: boolean) => void,
  main: () => Promise<T>
) => {
  toggle(true);
  const result = await main();
  toggle(false);
  return result;
};

export const setup = (
  setWaiting: (b: boolean) => void,
  account: Account | null
) =>
  withToggleAsync(setWaiting, async () => {
    const accounts = await setupAccounts(account);
    return {
      ...accounts,
    };
  });
