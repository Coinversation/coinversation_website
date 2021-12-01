import React from "react";
const Height = (props: { height: number }) => {
  return <div style={{ height: props.height + "px" }}></div>;
};
export default Height;
