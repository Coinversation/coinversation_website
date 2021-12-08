import React from "react";
import Identicon from "@polkadot/react-identicon";
const MIdenticon = (props: { address: string; size: number; style?: any }) => {
  const { address, size, style } = props;
  return (
    <Identicon
      value={address || "14r48SVtMrJKxUWD9ijDy8aQU3asTXja8qny9mzXTutdByju"}
      size={size}
      theme={"polkadot"}
      style={style}
    />
  );
};
export default MIdenticon;