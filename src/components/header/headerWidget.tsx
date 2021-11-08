import React from "react";
import "./headerWidget.less";
import Logo from "./components/logo";
import Menu from "./components/menu";
interface IProps {}
interface IState {
  showModal: boolean;
  onKey: string;
  Home: number;
  About: number;
  Parachain: number;
  RoadMap: number;
  Partners: number;
  Contact: number;
}
const LinkArray: string[] = [
  "Home",
  "About",
  "Parachain",
  "Road Map",
  "Partners",
  // "Contact",
];
export default class HeaderWidget extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: false,
      onKey: "Home",
      Home: 0,
      About: 0,
      Parachain: 0,
      RoadMap: 0,
      Partners: 0,
      Contact: 0,
    };
    this.changeOnKey = this.changeOnKey.bind(this);
    this.getScrollTop = this.getScrollTop.bind(this);
  }

  componentDidMount() {
    this.doScroll();
    // 获取元素距离顶部的高度
    const Home = this.getScrollTop("Home") || 0;
    const About = this.getScrollTop("About") || 0;
    const Parachain = this.getScrollTop("Parachain") || 0;
    const RoadMap = this.getScrollTop("RoadMap") || 0;
    const Partners = this.getScrollTop("Partners") || 0;
    const Contact = this.getScrollTop("Contact") || 0;
    this.setState({
      About,
      Parachain,
      RoadMap,
      Partners,
      Contact,
    });
    window.addEventListener("scroll", () => {
      this.doScroll();
      const _scrollTop = document.documentElement.scrollTop;
      const { onKey } = this.state;
      if (_scrollTop > Home && _scrollTop < About && onKey !== "Home") {
        this.setState({
          onKey: "Home",
        });
      } else if (
        _scrollTop > About &&
        _scrollTop < Parachain &&
        onKey !== "About"
      ) {
        this.setState({
          onKey: "About",
        });
      } else if (
        _scrollTop > Parachain &&
        _scrollTop < RoadMap &&
        onKey !== "Parachain"
      ) {
        this.setState({
          onKey: "Parachain",
        });
      } else if (
        _scrollTop > RoadMap &&
        _scrollTop < Partners &&
        onKey !== "RoadMap"
      ) {
        this.setState({
          onKey: "RoadMap",
        });
      } else if (
        _scrollTop > Partners &&
        _scrollTop < Contact &&
        onKey !== "Partners"
      ) {
        this.setState({
          onKey: "Partners",
        });
      } else if (_scrollTop > Contact && onKey !== "Contact") {
        this.setState({
          onKey: "Contact",
        });
      }
    });
  }
  getScrollTop(idStr: string) {
    const _idStr = document.getElementById(idStr);
    const _idRect = _idStr?.getBoundingClientRect();
    return _idRect?.top;
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
  changeOnKey(_key: string) {
    switch (_key.replaceAll(" ", "")) {
      case "Home":
        window.scrollTo(0, this.state.Home + 2 || 0);
        break;
      case "About":
        window.scrollTo(0, this.state.About + 2 || 0);
        break;
      case "Parachain":
        window.scrollTo(0, this.state.Parachain + 2 || 0);
        break;
      case "RoadMap":
        console.log(this.state.RoadMap);
        window.scrollTo(0, this.state.RoadMap + 2 || 0);
        break;
      case "Partners":
        window.scrollTo(0, this.state.Partners + 2 || 0);
        break;
      case "Contact":
        window.scrollTo(0, this.state.Contact + 2 || 0);
        break;
    }
  }
  render() {
    const { showModal, onKey } = this.state;
    // const [showModal, setShowModal] = useState(false);
    return (
      <div className="header">
        <div className="headerWidget big">
          <Logo />
          <Menu
            LinkArray={LinkArray}
            onKey={onKey}
            changeOnKey={this.changeOnKey}
          />
          <div className="fr">
            <a
              href="https://www.kaco.finance/"
              rel="noopener noreferrer"
              className="buyLink"
              target="_blank"
            >
              Launch DApp
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
              Launch DApp
            </a>
            <div className="menu">
              <img
                onClick={() => {
                  window.scrollTo(0, 0);
                  this.setState({
                    showModal: !showModal,
                  });
                }}
                src={require("./img/menu.svg")}
                alt="logo"
              />
            </div>
          </div>
        </div>
        {showModal ? (
          <div className="modal">
            <div
              className="menu"
              onClick={() => {
                this.setState({
                  showModal: !showModal,
                });
              }}
            >
              <Menu
                LinkArray={LinkArray}
                onKey={onKey}
                changeOnKey={this.changeOnKey}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
