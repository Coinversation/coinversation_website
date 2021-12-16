import React, { useEffect, useState } from "react";
import Tips from "@/components/tips/tipsWidget";
import "./listOfWinners.less";
import { getListOfWinners } from "../server/api";
const ListOfWinners = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const _res = await getListOfWinners();
      setData(_res);
    })();
  }, []);
  return (
    <div className="listOfWinners">
      <h2>List of winners</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.map((v, index: number) => (
            <li
              key={index}
              onClick={() => {
                window.open(
                  `https://polkadot.subscan.io/extrinsic/${v.extrinsicHash}`
                );
              }}
            >
              <h3>{v?.blockNum}</h3>
              <div className="_h4">
                <p>Block height</p>
                <Tips message="The height of the block invested by users who will be able to share the jackpot" />
              </div>
              <p>{v?.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h6>No data</h6>
      )}
    </div>
  );
};
export default ListOfWinners;
