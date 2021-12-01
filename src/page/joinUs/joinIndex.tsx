import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import Height from "@/components/height/heightWidget";
import JoinBanner from "./components/joinBanner";
import Process from "./components/process";
import ListOfWinners from "./components/listOfWinners";
import "./joinIndex.less";
export default function JoinIndex() {
  return (
    <div className="joinIndex">
      <HeaderWidget propsOnKey="ParachainA" />
      <div className="joinIndex_inner">
        <div className="joinIndex_inner_inner">
          <Height height={60} />
          <JoinBanner />
          <Height height={40} />
          <Process />
          <Height height={40} />
          <ListOfWinners />
          <Height height={60} />
        </div>
      </div>
      <FooterWidget />
    </div>
  );
}
