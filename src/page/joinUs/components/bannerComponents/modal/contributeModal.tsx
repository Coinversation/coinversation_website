import React, { useRef, useContext, useState, useEffect } from "react";
import "./contributeModal.less";
import { AccountContext, ApiRxContext } from "../../../context";
import {
  getAddressBalance,
  contribution,
  postContributeAdd,
} from "../../../server/api";
import { LastBlockContext } from "../../context/LastParachainData";
import toast from "@/components/toast";
import close from "./close.svg";
import { getContributeList } from "../../../server/api";
import { useContributeDataContextSet } from "../../../context/ContributeData";
const ContributeModal = (props: { visible: boolean; setVisible: any }) => {
  const amountKsmInput = useRef(null);
  const { api } = useContext(ApiRxContext);
  const [amount, setAmount] = useState(0);
  const currentAccount = useContext(AccountContext);
  const { visible, setVisible } = props;
  const [balance, setBalance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lastBlockContext = useContext(LastBlockContext);

  const setData = useContributeDataContextSet();
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
  const setMax = () => {
    let max = parseFloat(balance.toString());
    amountKsmInput.current.value = max;
    setAmount(max);
  };
  const changeAmount = (event: any) => {
    let value = event.target.value;
    if (!value) {
      value = 0;
    }
    if (parseFloat(value) < 0) {
      event.target.value = 0;
      value = 0;
    }
    setAmount(parseFloat(value));
    // setKsmReward(value / ratioReward);
  };
  const submitContribution = async () => {
    if (!amount || amount < 0 || amount > parseFloat(balance.toString())) {
      toast.show("Invalid DOT amount or insufficient balance");
      return;
    }

    setIsSubmitting(true);
    await contribution(
      `${amount}`,
      currentAccount.address,
      async (block: string, hash: string) => {
        if (hash) {
          setVisible(false);
          toast.show(`Completed at block hash: ${hash}`);
          const res = await postContributeAdd(
            block,
            `${new Date().getTime()}`,
            `${amount}`,
            currentAccount.publickey,
            "coinversation",
            currentAccount.address,
            hash
          );
          if (res) {
            const _res = await getContributeList(currentAccount?.publickey);
            setData(_res);
          }
        }
      }
    );
  };
  return visible ? (
    <div className="contributeModal">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>Contribute</h2>
          <img src={close} alt="" onClick={() => setVisible(false)} />
        </div>
        <h6>Balance: {balance} DOT</h6>
        <div className="contributeInput">
          <input
            className="input"
            name="DOT Amount"
            type={"number"}
            placeholder={"DOT Amount"}
            autoComplete={"off"}
            ref={amountKsmInput}
            onChange={changeAmount}
          />
          <button className="maxBtn" onClick={setMax}>
            Max
          </button>
        </div>
        <button
          className={
            isSubmitting || amount > parseFloat(balance.toString())
              ? "disable btn"
              : "btn"
          }
          onClick={submitContribution}
          disabled={isSubmitting || amount > parseFloat(balance.toString())}
        >
          {!isSubmitting ? "Submit Contribution" : "loading"}
        </button>
      </div>
    </div>
  ) : null;
};
export default ContributeModal;
