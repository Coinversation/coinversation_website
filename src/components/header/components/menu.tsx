import React from "react";
import { Link } from "react-router-dom";
import "./menu.less";
export default function Menu(props: {
  LinkArray: string[];
  onKey: string;
  changeOnKey: any;
}) {
  const { LinkArray, onKey, changeOnKey } = props;
  return (
    <>
      {LinkArray.map((v: string) => {
        if (v.toLowerCase().includes("parachain")) {
          return (
            <div
              key={v}
              title={v}
              className={
                v.replaceAll(" ", "") === onKey ? "on parachain" : "parachain"
              }
              onClick={() => changeOnKey(v)}
            >
              {v}
              <em></em>
              <i></i>
              <div className="menu_parachain_pop">
                <div className="fl">
                  <img
                    src={require("../img/icon_polkaSmith.svg")}
                    alt="icon_polkaSmith"
                  />
                </div>
                <div className="fr">
                  <h3>Winning CTO Awards</h3>
                  <p>
                    Coinversation is auctioning off Boca parallel slots to
                    pledge your DOT for a big CTO award. GET INVOLVED!
                  </p>
                  <Link to="/joinus">Details in</Link>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div
            key={v}
            title={v}
            className={v.replaceAll(" ", "") === onKey ? "on" : ""}
            onClick={() => changeOnKey(v)}
          >
            {v}
            <i></i>
          </div>
        );
      })}
    </>
  );
}
