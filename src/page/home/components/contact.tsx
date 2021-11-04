import React from "react";
import "./contact.less";
export default function Contact() {
  return (
    <div className="contact" id="Contact">
      <div className="contact_inner">
        <img
          className="contact_inner_logo"
          src={require("../img/logo.svg")}
          alt="logo"
        />
        <p className="text">
          All the information on this website or other official channels is
          published for information purposes only and is only intended for
          institutional investors and sophisticated individual investors. Any
          services to be provided in the future will be subject to the terms of
          the legal agreements relating thereto. Nothing on this Site should be
          interpreted as the investment endorsement by Coinversation Potocol or
          any other person. Coinversation Potocol and its related services are
          not provided to any individual from the United States.
        </p>
        <div className="footer">
          <p className="fl">
            Copyright © Coinversation 2021 All Rights Reserved.
          </p>
          <ul>
            <li>
              <a href="https://twitter.com/Coinversation_">
                <img
                  src={require("../img/icon_twiter.svg")}
                  alt="icon_twiter"
                />
              </a>
            </li>
            <li>
              <a href="https://t.me/coinversationofficial">
                <img
                  src={require("../img/icon_telegram.svg")}
                  alt="icon_twiter"
                />
              </a>
            </li>
            <li>
              <a href="https://github.com/Coinversation">
                <img
                  src={require("../img/icon_github.svg")}
                  alt="icon_twiter"
                />
              </a>
            </li>

            <li>
              <a href="https://coinversationofficial.medium.com/">
                <img
                  src={require("../img/icon_medium.svg")}
                  alt="icon_twiter"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
