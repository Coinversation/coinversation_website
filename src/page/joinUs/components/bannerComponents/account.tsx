import React from "react";
import "./account.less";
const Account = () => {
  return (
    <div className="account">
      <ul>
        <li>
          <img src={require("./img/icon_li.svg")} alt="icon_li" />
          <p>Puted in</p>
          <h4>12 DOT</h4>
        </li>
        <li>
          <img src={require("./img/icon_li.svg")} alt="icon_li" />
          <p>Estimated score</p>
          <h4>3.8 CTO</h4>
        </li>
      </ul>
      <button>Put DOT</button>
      <div className="now_account">
        <h5>LeeH</h5>
        <p>4bna...82ks</p>
        <img src={require("./img/icon_switch.svg")} alt="icon_switch" />
      </div>
    </div>
  );
};
export default Account;
