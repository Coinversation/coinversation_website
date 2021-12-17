import React, { useRef, useContext, useState } from "react";
import "./contributeModal.less";
import { AccountContext } from "../../../context";
import { contribution, postContributeAdd } from "../../../server/api";
import toast from "@/components/toast";
import close from "./close.svg";
import {
  getContributeList,
  getContributeTotal,
  getMyContribute,
} from "../../../server/api";
import {
  useContributeDataContextSetAllTotal,
  useContributeDataContextSetList,
  useContributeDataContextSetCount,
  useContributeDataContextSetTotal,
} from "../../../context/ContributeData";
const ContributeModal = (props: {
  visible: boolean;
  setVisible: any;
  balance: number;
}) => {
  const amountKsmInput = useRef(null);
  const [amount, setAmount] = useState(0);
  const currentAccount = useContext(AccountContext);
  const { visible, setVisible, balance } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAlltotal = useContributeDataContextSetAllTotal();
  const setList = useContributeDataContextSetList();
  const setCount = useContributeDataContextSetCount();
  const setTotal = useContributeDataContextSetTotal();

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
    if (!amount || amount < 5 || amount > parseFloat(balance.toString())) {
      toast.show("Invalid DOT amount or insufficient balance");
      return;
    }
    setIsSubmitting(true);
    await contribution(
      `${amount}`,
      currentAccount.address,
      currentAccount.meta.source,
      async (block: string, hash: string) => {
        window.localStorage.setItem(
          "TRADE_HASH",
          JSON.stringify({
            blockHash: block,
            extrinsicHash: hash,
          })
        );

        if (hash) {
          setVisible(false);
          toast.show(`Completed at block hash: ${hash}`);
          const res = await postContributeAdd(block, hash);
          if (res) {
            window.localStorage.removeItem("TRADE_HASH");
            const _res = await getContributeList();
            setList(_res);
            const resAlltotal = await getContributeTotal();
            setAlltotal(resAlltotal.totalStakedFromPage);
            setCount(resAlltotal.totalAddressesFromPage);
            const res = await getMyContribute(currentAccount?.publickey);
            setTotal(res);
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
