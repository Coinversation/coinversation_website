import React, { useEffect, useContext, useState } from "react";
import {
  AllAccounts,
  ApiRxContext,
  AccountContext,
  mInjectedAccountWithMeta,
  useAccountSetter,
} from "../../../context";
import { getAddressBalance } from "../../../server/api";
import Identicon from "@polkadot/react-identicon";
import close from "./close.svg";
import ok from "./ok.svg";

import "./switchAddress.less";
const SwitchAddress = (props: { visible: boolean; setVisible: any }) => {
  const allAccounts = useContext(AllAccounts);
  const { api } = useContext(ApiRxContext);
  const { visible, setVisible } = props;
  const currentAccount = useContext(AccountContext);
  const [balance, setBalance] = useState<any>({});
  const setAccounts = useAccountSetter();
  useEffect(() => {
    if (api && currentAccount && currentAccount.address) {
      (async () => {
        if (allAccounts.length) {
          let _balance = balance;
          allAccounts.map(async (v: mInjectedAccountWithMeta) => {
            console.log(v.address);
            if (v.address) {
              const res = await getAddressBalance(v.address);
              _balance[`${v.address}`] = `${res}`;
              console.log(_balance);
              setBalance(_balance);
              return null;
            }
          });
        }
      })();
    }
  }, [api, currentAccount, allAccounts, balance]);
  return visible ? (
    <div className="switchAddress">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>Contribute</h2>
          <img src={close} alt="" onClick={() => setVisible(false)} />
        </div>
        <ul>
          {allAccounts && allAccounts.length
            ? allAccounts.map((v: mInjectedAccountWithMeta, index: number) => (
                <li
                  key={index}
                  className={v.address === currentAccount.address ? "on" : ""}
                  onClick={() => {
                    setAccounts(v);
                    localStorage.setItem(
                      "SELECTED_KSM_WALLET",
                      JSON.stringify(v)
                    );
                  }}
                >
                  <div className="polkadot_icon">
                    <Identicon value={v.address} size={32} theme={"polkadot"} />
                  </div>
                  <h5>{v.meta?.name}</h5>
                  <p>{v.sortAddress}</p>
                  {balance[`${v.address}`] ? (
                    <h6>Balance: {balance[`${v.address}`]} DOT</h6>
                  ) : null}
                  <img className="icon_ok" src={ok} alt="" />
                </li>
              ))
            : null}
        </ul>
        <button className="btn" onClick={() => setVisible(false)}>
          Confirm
        </button>
      </div>
    </div>
  ) : null;
};
export default SwitchAddress;
