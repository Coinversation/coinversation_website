import React from "react";
import config from "../../../config/index";
function Logo() {
  return (
    <a className="logo" href={config.preLink + "/"} title="0xcoinversation">
      <img src={require("../img/logo.svg")} alt="logo" />
    </a>
  );
}
export default Logo;
