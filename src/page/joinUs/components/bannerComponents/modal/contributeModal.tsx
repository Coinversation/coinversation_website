import React, { useRef, useContext, useState, useEffect } from "react";
import "./contributeModal.less";
import { AccountContext, ApiRxContext } from "../../../context";
import { getAddressBalance, contribution } from "../../../server/api";
import toast from "@/components/toast";
import close from "./close.svg";
const ContributeModal = (props: { visible: boolean; setVisible: any }) => {
  const amountKsmInput = useRef(null);
  const { api } = useContext(ApiRxContext);
  const [ksmAmount, setKsmAmount] = useState(0);
  const currentAccount = useContext(AccountContext);
  const { visible, setVisible } = props;
  const ratioReward = 1 / 350; //%
  // const [ksmReward, setKsmReward] = useState(0);
  const [ksmBalance, setKsmBalance] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (
      api &&
      currentAccount &&
      currentAccount.address &&
      currentAccount.address.length > 0
    ) {
      (async () => {
        console.log(currentAccount.address);
        const res = await getAddressBalance(currentAccount.address);
        setKsmBalance(res);
      })();
    }
  }, [api, currentAccount]);
  const setMax = () => {
    let max = parseFloat(ksmBalance.toString());
    // @ts-ignore
    amountKsmInput.current.value = max;
    setKsmAmount(max);
    // setKsmReward(max / ratioReward);
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
    setKsmAmount(parseFloat(value));
    // @ts-ignore
    setKsmReward(value / ratioReward);
  };
  const submitContribution = async () => {
    if (
      !ksmAmount ||
      ksmAmount < 0 ||
      ksmAmount > parseFloat(ksmBalance.toString())
    ) {
      toast.show("Invalid KSM amount or insufficient balance");
      return;
    }

    setIsSubmitting(true);
    // @ts-ignore
    const val = new BN(ksmDecimals * ksmAmount);
    const hash = await contribution(val, currentAccount.address);
    if (hash) {
      toast.show(`Completed at block hash: ${hash}`);
    }
  };
  return visible ? (
    <div className="contributeModal">
      <div className="modal-content">
        <div className="modal-content-title">
          <h2>Contribute</h2>
          <img src={close} alt="" onClick={() => setVisible(false)} />
        </div>
        <h6>Balance: {ksmBalance} DOT</h6>
        <div className="contributeInput">
          <input
            className="input"
            name="DOT Amount"
            type={"number"}
            placeholder={"KSM Amount"}
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
            isSubmitting || ksmAmount > parseFloat(ksmBalance.toString())
              ? "disable btn"
              : "btn"
          }
          onClick={submitContribution}
          disabled={
            isSubmitting || ksmAmount > parseFloat(ksmBalance.toString())
          }
        >
          {!isSubmitting ? "Submit Contribution" : "loading"}
        </button>
      </div>
    </div>
  ) : null;
};
export default ContributeModal;
