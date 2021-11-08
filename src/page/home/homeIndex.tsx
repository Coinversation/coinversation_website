import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import About from "./components/about";
import Banner from "./components/banner";
import Workflow from "./components/workflow";
import Contact from "./components/contact";
import RoadMap from "./components/roadMap";
import Partners from "./components/partners";
import "./homeIndex.less";
export default function HomeIndex() {
  return (
    <div className="homeIndex">
      <HeaderWidget />
      <Banner />
      <About />
      <Workflow />
      <RoadMap />
      <Partners />
      <Contact />
    </div>
  );
}
