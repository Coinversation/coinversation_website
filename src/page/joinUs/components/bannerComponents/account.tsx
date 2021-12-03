import React, { useContext, useEffect, useState } from "react";
import { u8aToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/util-crypto";
import Identicon from "@polkadot/react-identicon";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { AccountsContext } from "@substrate/context";
import { setup } from "../../state/state";
import "./account.less";
interface mInjectedAccountWithMeta extends InjectedAccountWithMeta {
  publickey?: string;
  shidenAddress?: string;
  sortAddress?: string;
}
const Account = () => {
  const [message, setMessage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [allAccounts, setAllAccounts] = useState<mInjectedAccountWithMeta[]>(
    []
  );
  const [currentAccount, setCurrentAccount] =
    useState<mInjectedAccountWithMeta | null>({
      address: "",
      meta: {
        genesisHash: "",
        name: "",
        source: "",
      },
      type: "ed25519",
      publickey: "",
      shidenAddress: "",
      sortAddress: "",
    });
  // console.log(1111);
  // 链接钱包
  useEffect(() => {
    setup(setWaiting, null).then((r) => {
      if (r.kind === "ok") {
        // 获取publicKey
        const _arr = r.injectedAccounts.map((v) => {
          const publickey = u8aToHex(decodeAddress(v.address, true));
          return {
            ...v,
            publickey,
            sortAddress: `${v.address.slice(0, 7)}...${v.address.slice(
              v.address.length - 4,
              v.address.length
            )}`,
          };
        });
        if (localStorage.getItem("SELECTED_KSM_WALLET")) {
          const _item: mInjectedAccountWithMeta = JSON.parse(
            localStorage.getItem("SELECTED_KSM_WALLET")
          );
          if (
            _arr.filter(
              (v: mInjectedAccountWithMeta) => v.publickey === _item.publickey
            )
          ) {
            setCurrentAccount(_item);
          } else {
            setCurrentAccount(_arr[0]);
          }
        } else {
          setCurrentAccount(_arr[0]);
        }
        setAllAccounts(_arr);
      } else {
        setMessage(r.message || "");
      }
    });
    // eslint-disable-next-line
  }, []);
  console.log({ currentAccount }, allAccounts);
  return (
    <div className="account">
      <ul>
        <li>
          <img src={require("./img/icon_li.svg")} alt="icon_li" />
          <p>DOT to Contribute</p>
          <h4>12 DOT</h4>
        </li>
        <li>
          <img src={require("./img/icon_li.svg")} alt="icon_li" />
          <p>Estimated score</p>
          <h4>3.8 CTO</h4>
        </li>
      </ul>
      <button className={waiting || message ? "disable" : ""}>Put DOT</button>
      {waiting ? (
        <h4 className="textH4">
          <i>waiting</i>
        </h4>
      ) : null}
      {message ? <h4 className="textH4">{message}</h4> : null}
      <div className="now_account">
        <div className="polkadot_icon">
          <Identicon
            value={currentAccount.address}
            size={32}
            style={{ marginTop: 10 }}
            theme={"polkadot"}
          />
        </div>
        <h5>{currentAccount.meta?.name}</h5>
        <p>{currentAccount.sortAddress}</p>
        <img src={require("./img/icon_switch.svg")} alt="icon_switch" />
      </div>
    </div>
  );
};
export default Account;
