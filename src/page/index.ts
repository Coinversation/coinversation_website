import { lazy } from "react";
const HomeIndex = lazy(() => import("./home/homeIndex"));
const JoinUs = lazy(() => import("./joinUs/joinIndex"));
export { HomeIndex, JoinUs };
