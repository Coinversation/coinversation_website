import React, { useState } from "react";
import "./headerWidget.less";
import Logo from "./components/logo";
import Menu from "./components/menu";
function HeaderWidget() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="header"
      id="Home"
      style={{
        backgroundColor: showModal ? "#f9f7f8" : "#fff",
        position: showModal ? "static" : "fixed",
      }}
    >
      <div className="headerWidget big">
        <Logo />
        <Menu />
        <div className="fr">
          <a href="#sss" className="buyLink" target="_blank">
            Buy Token
          </a>
        </div>
      </div>
      <div className="samll">
        <div className="fl">
          <Logo />
        </div>
        <div className="fr">
          <a
            href="https://www.kaco.finance/"
            rel="noopener noreferrer"
            className="buyLink"
            target="_blank"
          >
            Buy Token
          </a>
          <div className="menu">
            <img
              onClick={() => setShowModal(!showModal)}
              src={require("./img/menu.png")}
              alt="logo"
            />
          </div>
        </div>
      </div>
      {showModal ? (
        <div className="modal">
          <div className="menu" onClick={() => setShowModal(!showModal)}>
            <Menu />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default HeaderWidget;
