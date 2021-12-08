import * as React from "react";

import { polkadotIcon } from "@polkadot/ui-shared";
import type { Circle } from "@polkadot/ui-shared/icons/types";

function _Identicon(props: { address: string; size: number }) {
  return (
    <svg
      className={"identicon"}
      height={props.size}
      id={props.address}
      name={props.address}
      viewBox="0 0 64 64"
      width={props.size}
    >
      {polkadotIcon(props.address, { isAlternative: false }).map(renderCircle)}
    </svg>
  );
}

function renderCircle({ cx, cy, fill, r }: Circle, key: number) {
  return <circle cx={cx} cy={cy} fill={fill} key={key} r={r} />;
}

export default React.memo(_Identicon);
