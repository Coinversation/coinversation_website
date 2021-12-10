import React, { useContext, useEffect, useState } from "react";
import { u8aToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/util-crypto";
import MIdenticon from "./identicon";
import { setup } from "../../state/state";
import "./account.less";
import {
  useAccountSetter,
  useAllAccountsSetter,
  mInjectedAccountWithMeta,
  AccountContext,
} from "../../context";
import { ContributeDataContext } from "../../context/ContributeData";
import { sortName } from "../../utils/utils";
import ContributeModal from "./modal/contributeModal";
import SwitchAddress from "./modal/switchAddress";
const Account = (props: { btnOnly?: boolean; receivePns?: boolean }) => {
  const { btnOnly, receivePns } = props;
  const [message, setMessage] = useState("");
  const setAccounts = useAccountSetter();
  const currentAccount = useContext(AccountContext);
  const setAllAccounts = useAllAccountsSetter();
  const parachainData = useContext(ContributeDataContext);
  const [waiting, setWaiting] = useState(false);

  const [contributeModal, setContributeModal] = useState(false);
  const [switchAddress, setSwitchAddress] = useState(false);
  // 链接钱包
  useEffect(() => {
    setup(setWaiting, null).then((r) => {
      if (r.kind === "ok") {
        // 获取publicKey
        if (r && r.injectedAccounts && r.injectedAccounts.length) {
          const _arr = r.injectedAccounts.map((v) => {
            const publickey = u8aToHex(decodeAddress(v.address, true));
            return {
              ...v,
              publickey,
              sortAddress: sortName(v.address),
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
              setAccounts(_item);
            } else {
              setAccounts(_arr[0]);
            }
          } else {
            setAccounts(_arr[0]);
          }
          setAllAccounts(_arr);
        }
      } else {
        setMessage(r.message || "");
      }
    });
  }, [setAccounts, setAllAccounts]);

  return (
    <div className="account">
      {message || btnOnly ? null : (
        <ul className="account_ul">
          <li>
            <img src={require("./img/icon_li.svg")} alt="icon_li" />
            <p>DOT to Contribute</p>
            <h4>{parachainData?.total} DOT</h4>
          </li>
          <li>
            <img src={require("./img/icon_li.svg")} alt="icon_li" />
            <p>Estimated score</p>
            <h4>{parachainData?.total} CTO</h4>
          </li>
        </ul>
      )}
      <button
        className={
          waiting || message
            ? "disable btn"
            : btnOnly && !receivePns
            ? "btn btn_count"
            : "btn"
        }
        onClick={() => {
          if (receivePns) {
            window.open("https://www.baidu.com/");
          } else {
            setContributeModal(!contributeModal);
          }
        }}
      >
        {receivePns ? "Receive PNS" : "DOT to Contribute"}
      </button>
      {waiting ? (
        <h4 className="textH4">
          <i>waiting</i>
        </h4>
      ) : null}
      {message ? <h4 className="textH4">{message}</h4> : null}
      <div className="now_account">
        <div className="polkadot_icon">
          {currentAccount && currentAccount.address ? (
            <MIdenticon address={currentAccount?.address} size={32} />
          ) : null}
        </div>
        <h5>{currentAccount.meta?.name}</h5>
        <p>{currentAccount.sortAddress}</p>
        {currentAccount.sortAddress ? (
          <img
            src={require("./img/icon_switch.svg")}
            alt="icon_switch"
            onClick={() => setSwitchAddress(true)}
          />
        ) : null}
      </div>
      <ContributeModal
        visible={contributeModal}
        setVisible={setContributeModal}
      />
      <SwitchAddress visible={switchAddress} setVisible={setSwitchAddress} />
    </div>
  );
};
export default Account;
