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
            >
              <p onClick={() => changeOnKey(v)}>
                {v}
                <em></em>
                <i></i>
              </p>
              <div className="menu_parachain_pop">
                <ul>
                  <li>
                    <Link to="/joinus">
                      <div className="fl">
                        <img
                          src={require("../img/icon_polkaSmith.svg")}
                          alt="icon_polkaSmith"
                        />
                      </div>
                      <div className="fr">
                        <h3>Auction Event</h3>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/parachains/crowdloan"
                    >
                      <div className="fl">
                        <img
                          src={require("../img/icon_Polkadot.svg")}
                          alt="icon_Polkadot"
                        />
                      </div>
                      <div className="fr">
                        <h3>Polkadot</h3>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://crowdloan.parallel.fi/#/auction/polkadot"
                    >
                      <div className="fl">
                        <img
                          src={require("../img/icon_Parallel.svg")}
                          alt="icon_Parallel"
                        />
                      </div>
                      <div className="fr">
                        <h3>Parallel</h3>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://bifrost.app/vcrowdloan?paraId=2027"
                    >
                      <div className="fl">
                        <img
                          src={require("../img/icon_Bifrost.svg")}
                          alt="icon_Bifrost"
                        />
                      </div>
                      <div className="fr">
                        <h3>Bifrost</h3>
                      </div>
                    </a>
                  </li>
                </ul>
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
