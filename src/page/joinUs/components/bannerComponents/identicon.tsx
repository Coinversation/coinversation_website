import * as React from "react";

import { polkadotIcon } from "@polkadot/ui-shared";
import type { Circle } from "@polkadot/ui-shared/icons/types";

function _Identicon(props: { address: string; size: number }) {
  const _address =
    props.address || "14r48SVtMrJKxUWD9ijDy8aQU3asTXja8qny9mzXTutdByju";
  console.log(_address);
  return (
    <svg
      className={"identicon"}
      height={props.size}
      id={_address}
      name={_address}
      viewBox="0 0 64 64"
      width={props.size}
    >
      {polkadotIcon(_address, { isAlternative: false }).map(renderCircle)}
    </svg>
  );
}

function renderCircle({ cx, cy, fill, r }: Circle, key: number) {
  return <circle cx={cx} cy={cy} fill={fill} key={key} r={r} />;
}

export default React.memo(_Identicon);
