import React from "react";
// import Identicon from "@polkadot/react-identicon";
const MIdenticon = (props: { address: string; size: number; style?: any }) => {
  // theme={"polkadot"}
  const { address, size } = props;
  // if (address && `${address}`.length > 5) {
  //   return (
  //     <Identicon value={address} size={size} theme={"polkadot"} style={style} />
  //   );
  // }
  return (
    <div>
      {address} {size}
    </div>
  );
};
export default MIdenticon;
