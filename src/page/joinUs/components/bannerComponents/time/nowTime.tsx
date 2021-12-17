import React from "react";
import Tips from "@/components/tips/tipsWidget";
import config from "@/config";
const NowTime = () => {
  // let now = new Date();
  // const [countHours, setCountHours] = useState(now.getHours());
  // const [countMinutes, setCountMinutes] = useState(now.getMinutes());
  // const [countSeconds, setCountSeconds] = useState(now.getSeconds());
  // const timer = useRef<NodeJS.Timer>();
  // useEffect(() => {
  //   timer.current = setInterval(() => {
  //     const now = new Date();
  //     setCountHours(now.getHours());
  //     setCountMinutes(now.getMinutes());
  //     setCountSeconds(now.getSeconds());
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer.current);
  //   };
  // }, []);

  return (
    <>
      <h3>{config.maxBlock}</h3>
      <div className="text_p">
        <p>Block</p>
        <Tips
          message={`If the user does not invest in ${config.maxBlock} blocks, the last user who contributes will be able to share the jackpot after Coinversation win the auction`}
        />
      </div>
      <h3>
        {Math.floor((config.maxBlock * 6) / 60) % 60}:00
        {/* {countHours < 10 ? `0${countHours}` : countHours}:
        {countMinutes < 10 ? `0${countMinutes}` : countMinutes}:
        {countSeconds < 10 ? `0${countSeconds}` : countSeconds} */}
      </h3>
      <div className="text_p">
        <p>Countdown</p>
        <Tips message={"The estimated time based on the block"} />
      </div>
    </>
  );
};

export default NowTime;
