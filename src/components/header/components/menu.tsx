import React, { useState } from "react";
export default function Menu() {
  const [onKey, setOnKey] = useState("Home");
  const LinkArray = [
    "Home",
    "About",
    // "Workflow",
    "Road Map",
    "Partners",
    "Contact",
  ];
  return (
    <>
      {LinkArray.map((v: string) => (
        <a
          href={`#${(v || "").replaceAll(" ", "")}`}
          key={v}
          title={v}
          onClick={() => setOnKey(v)}
          className={v === onKey ? "on" : ""}
        >
          {v}
          <i></i>
        </a>
      ))}
    </>
  );
}
