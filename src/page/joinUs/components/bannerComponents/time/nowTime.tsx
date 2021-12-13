import React, { useEffect, useState } from "react";
import config from "@/config";
const NowTime = () => {
  let now = new Date();
  const [countHours, setCountHours] = useState(now.getHours());
  const [countMinutes, setCountMinutes] = useState(now.getMinutes());
  const [countSeconds, setCountSeconds] = useState(now.getSeconds());
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCountHours(now.getHours());
      setCountMinutes(now.getMinutes());
      setCountSeconds(now.getSeconds());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h3>{config.maxBlock}</h3>
      <div className="text_p">
        <p>Comdivletion Block</p>
      </div>
      <h3>
        {countHours < 10 ? `0${countHours}` : countHours}:
        {countMinutes < 10 ? `0${countMinutes}` : countMinutes}:
        {countSeconds < 10 ? `0${countSeconds}` : countSeconds}
      </h3>
      <div className="text_p">
        <p>Now Time</p>
      </div>
    </>
  );
};

export default NowTime;
