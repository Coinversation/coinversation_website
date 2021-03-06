import React from "react";
import Tips from "@/components/tips/tipsWidget";
import config from "@/config";

const BlockTime = (props: { last: number; latest: number }) => {
  // const { last, latest } = props;
  // const [remain, setRemain] = useState(config.maxBlock);

  // const [countMinutes, setCountMinutes] = useState("00");
  // const [countSeconds, setCountSeconds] = useState("00");
  // const timer = useRef<NodeJS.Timer>();
  // useEffect(() => {
  //   let _remain =
  //     last === 0 ? config.maxBlock : config.maxBlock - (latest - last);
  //   if (_remain !== remain && _remain > 0) {
  //     setRemain(_remain);
  //   }
  // }, [last, latest, remain]);

  // useEffect(() => {
  //   if (lastM === last) {
  //     return;
  //   }
  //   setLastM(last);
  //   let _remain =
  //     last === 0 ? config.maxBlock : config.maxBlock - (latest - last);
  //   if (_remain === remain) {
  //     return;
  //   }
  //   if (_remain <= 0) {
  //     if (
  //       countSeconds !== "00" ||
  //       countMinutes !== "00" ||
  //       countHours !== "00"
  //     ) {
  //       setCountHours("00");
  //       setCountMinutes("00");
  //       setCountSeconds("00");
  //     }
  //     if (timer.current) {
  //       clearInterval(timer.current);
  //     }
  //     setRemain(0);
  //     return;
  //   }
  //   if (_remain > config.maxBlock) {
  //     _remain = config.maxBlock;
  //   }
  //   setRemain(_remain);
  // }, [last, latest, lastM, remain, countSeconds, countMinutes, countHours]);
  // useEffect(() => {
  //   if (remain <= 0) {
  //     if (timer) {
  //       clearInterval(timer.current);
  //     }
  //     setCountMinutes("00");
  //     setCountSeconds("00");
  //     return;
  //   }
  //   if (timer) {
  //     clearInterval(timer.current);
  //   }
  //   let i = 0;
  //   timer.current = setInterval(() => {
  //     let offset = remain * 6 - i;
  //     if (offset < 0) {
  //       clearInterval(timer.current);
  //       return;
  //     }
  //     let minutesCal = Math.floor(offset / 60) % 60;
  //     setCountMinutes(minutesCal >= 10 ? String(minutesCal) : "0" + minutesCal);
  //     setCountSeconds(
  //       offset % 60 >= 10 ? String(offset % 60) : "0" + (offset % 60)
  //     );
  //     if (i && i % 6 === 0) {
  //       if (remain - 1 < 0) {
  //         setRemain(0);
  //         clearInterval(timer.current);
  //         return;
  //       }
  //       setRemain(remain - 1);
  //     }
  //     i++;
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer.current);
  //   };
  // }, [remain]);

  return (
    <div className="blockTime">
      <div className="blockTime_fl">
        <h3>--</h3>
        {/* <h3>{`${remain <= 0 ? config.maxBlock : remain}`}</h3> */}
        <div className="text_p">
          <p>Block</p>
          <Tips
            message={`If the user does not invest in ${config.maxBlock} blocks, the last user who contributes will be able to share the jackpot after Coinversation win the auction`}
          />
        </div>
      </div>
      <div className="blockTime_fr">
        <h3>
          {/* {countHours}: */}
          {/* {remain <= 0
            ? Math.floor((config.maxBlock * 6) / 60) % 60
            : countMinutes}
          :{countSeconds} */}
          --:--
        </h3>
        <div className="text_p">
          <p>Countdown</p>
          <Tips message={"The estimated time based on the block"} />
        </div>
      </div>
    </div>
  );
};
export default BlockTime;
