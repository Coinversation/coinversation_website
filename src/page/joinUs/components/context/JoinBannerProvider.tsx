import { createContext, useContext } from "react";
export const LastParachainData = createContext<any>(null);
export const useLastParachainData = () => {
  const account = useContext(LastParachainData);
  if (!account) {
    throw new Error("LastParachainData null");
  }
  return account;
};
export const LastParachainDataSet = createContext<React.Dispatch<
  React.SetStateAction<any>
> | null>(null);
export const useParachainDataSet = () => {
  const setter = useContext(LastParachainDataSet);
  if (!setter) {
    throw new Error("LastParachainDataSet null");
  }
  return setter;
};
