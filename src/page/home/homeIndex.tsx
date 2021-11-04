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
  componentDidMount() {
    this.doScroll();
    window.addEventListener("scroll", this.doScroll);
  }
  doScroll = () => {
    const animates: NodeListOf<Element> = document.querySelectorAll(".animate");
    for (const dom of animates as any) {
      const top = dom.offsetTop;
      const scrollTop = window.scrollY;
      const innerHeight = window.innerHeight;
      if (scrollTop + innerHeight - innerHeight / 10 > top) {
        dom.className = dom.className.replace("animate", dom.dataset.animate);
      }
    }
  };
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
