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
  return data && data.length > 0 ? (
    <div className="listOfWinners">
      <h2>List of winners</h2>
      <ul>
        {data.map((v) => (
          <li>
            <h3>{v?.block}</h3>
            <h4>
              Block height
              <Tips message="ddd" />
            </h4>
            <p>{v?.address}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};
export default ListOfWinners;
