import React from "react";
export default function Menu(props: {
  LinkArray: string[];
  onKey: string;
  changeOnKey: any;
}) {
  const { LinkArray, onKey, changeOnKey } = props;
  return (
    <>
      {LinkArray.map((v: string) => (
        <div
          key={v}
          title={v}
          className={v.replaceAll(" ", "") === onKey ? "on" : ""}
          onClick={() => changeOnKey(v)}
        >
          {v}
          <i></i>
        </div>
      ))}
    </>
  );
}
