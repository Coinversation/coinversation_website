import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import About from "./components/about";
import Banner from "./components/banner";
import Workflow from "./components/workflow";
import Contact from "./components/contact";
import RoadMap from "./components/roadMap";
import Partmers from "./components/partmers";
import "./homeIndex.less";
export default class HomeIndex extends React.Component {
  render() {
    return (
      <div className="homeIndex">
        <HeaderWidget />
        <Banner />
        <About />
        <Workflow />
        <RoadMap />
        <Partmers />
        <Contact />
      </div>
    );
  }
}
