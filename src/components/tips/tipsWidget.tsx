import React from "react";
import "./tipsWidget.less";
const Tips = (props: { message: string }) => {
  return (
    <div className="icon_tips">
      <img
        src={require("./img/icon_tips.svg")}
        alt="icon_tips"
        className="icon_tips"
      />
      <div className="icon_tips_text">
        <p>{props.message}</p>
      </div>
    </div>
  );
};
export default Tips;
