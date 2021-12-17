import React, { useContext, useEffect, useState } from "react";
import { u8aToHex } from "@polkadot/util";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import MIdenticon from "./identicon";
import { setup } from "../../state/state";
import toast from "@/components/toast";
import "./account.less";

import {
  useAccountSetter,
  useAllAccountsSetter,
  mInjectedAccountWithMeta,
  AccountContext,
  ApiRxContext,
} from "../../context";
import { getAddressBalance } from "../../server/api";
import { ContributeDataContext } from "../../context/ContributeData";
import { sortName, getGrandPrizePool, formatNumber } from "../../utils/utils";
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
  const { api } = useContext(ApiRxContext);

  const [contributeModal, setContributeModal] = useState(false);
  const [switchAddress, setSwitchAddress] = useState(false);
  const [balance, setBalance] = useState<number | undefined>();
  useEffect(() => {
    if (
      api &&
      currentAccount &&
      currentAccount.address &&
      currentAccount.address.length > 0
    ) {
      (async () => {
        const res = await getAddressBalance(currentAccount.address);
        setBalance(res);
      })();
    }
  }, [api, currentAccount]);
  // 链接钱包
  useEffect(() => {
    setup(setWaiting, null).then((r) => {
      if (r.kind === "ok") {
        // 获取publicKey
        if (r && r.injectedAccounts && r.injectedAccounts.length) {
          const _arr = r.injectedAccounts.map((v) => {
            const publickey = u8aToHex(decodeAddress(v.address, true));
            const address = encodeAddress(publickey, 0);
            return {
              ...v,
              publickey,
              sortAddress: sortName(address),
              address: address,
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
    <div
      className="account"
      style={{ paddingTop: btnOnly ? "0" : message ? "80px" : "60px" }}
    >
      {message || btnOnly ? null : (
        <ul className="account_ul">
          <li>
            <img src={require("./img/icon_li.svg")} alt="icon_li" />
            <p>Contributed</p>
            <h4>{parachainData?.total ?? 0} DOT</h4>
          </li>
          <li>
            <img src={require("./img/icon_li.svg")} alt="icon_li" />
            <p>Est. Receive</p>
            <h4>
              {parachainData && parachainData.alltotal && parachainData.total
                ? formatNumber(
                    parseFloat(
                      `${
                        (Number(getGrandPrizePool(parachainData?.count)[0]) *
                          parachainData?.total) /
                        parachainData.alltotal
                      }`
                    ).toFixed(0)
                  )
                : "0"}{" "}
              CTO
            </h4>
          </li>
        </ul>
      )}
      <button
        className={
          waiting || message || !api
            ? "disable btn"
            : btnOnly && !receivePns
            ? "btn btn_count"
            : "btn"
        }
        disabled={waiting || message ? true : false}
        onClick={() => {
          if (receivePns) {
            // window.open("https://www.baidu.com/");
          } else {
            if (message) {
              return;
            }
            if (balance === undefined) {
              toast.show(`Getting balance`);
              return;
            }
            setContributeModal(!contributeModal);
          }
        }}
      >
        {receivePns ? "Coming Soon" : "Contribute Now"}
        {/* {receivePns ? "Claim on PNS" : "Contribute Now"} */}
      </button>
      {waiting ? (
        <h4 className="textH4">
          <i>waiting</i>
        </h4>
      ) : null}
      {message ? <h4 className="textH4">{message}</h4> : null}
      {btnOnly ? null : (
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
      )}
      <ContributeModal
        visible={contributeModal}
        setVisible={setContributeModal}
        balance={balance}
      />
      <SwitchAddress visible={switchAddress} setVisible={setSwitchAddress} />
    </div>
  );
};
export default Account;
