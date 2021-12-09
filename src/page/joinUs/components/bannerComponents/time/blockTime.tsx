import React, { useEffect, useState } from "react";
import Tips from "@/components/tips/tipsWidget";
const BlockTime = (props: { last: number; latest: number }) => {
  const { last, latest } = props;
  const [remain, setRemain] = useState(6000);

  const [lastM, setLastM] = useState<number>();
  const [countHours, setCountHours] = useState("00");
  const [countMinutes, setCountMinutes] = useState("00");
  const [countSeconds, setCountSeconds] = useState("00");
  let timer;

  useEffect(() => {
    if (lastM === last) {
      return;
    }
    setLastM(last);
    const _remain = 6000 - (latest - last);
    if (_remain === remain) {
      return;
    }
    if (_remain < 0) {
      if (
        countSeconds !== "00" ||
        countMinutes !== "00" ||
        countHours !== "00"
      ) {
        setCountHours("00");
        setCountMinutes("00");
        setCountSeconds("00");
      }
      if (timer) {
        clearInterval(timer);
      }
      setRemain(0);
      return;
    }

    setRemain(_remain);
  }, [last, latest, lastM, remain]);
  useEffect(() => {
    if (remain <= 0) {
      return;
    }
    if (timer) {
      clearInterval(timer);
    }
    let i = 0;
    timer = setInterval(() => {
      let offset = remain * 6 - i;
      if (offset < 0) {
        clearInterval(timer);
        return;
      }
      let minutesCal = Math.floor(offset / 60) % 60;
      let hoursCal = Math.floor(offset / (60 * 60)) % 24;
      setCountHours(hoursCal >= 10 ? String(hoursCal) : "0" + hoursCal);

      setCountMinutes(minutesCal >= 10 ? String(minutesCal) : "0" + minutesCal);
      setCountSeconds(
        offset % 60 >= 10 ? String(offset % 60) : "0" + (offset % 60)
      );
      i++;
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [remain]);

  return (
    <>
      <h3>{remain}</h3>
      <div className="text_p">
        <p>Comdivletion Block</p>
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </div>
      <h3>
        {countHours}:{countMinutes}:{countSeconds}
      </h3>
      <div className="text_p">
        <p>Countdown</p>
        <Tips
          message={
            "An introduction to copywriting Here is an explanatory note on special nouns"
          }
        />
      </div>
    </>
  );
};
export default BlockTime;
