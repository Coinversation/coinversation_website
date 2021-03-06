import React from "react";
import { HomeIndex, JoinUs } from "../page";
import config from "../config/index";
export type RouterType = {
  path: string;
  component: React.LazyExoticComponent<any>;
  root: string[];
  notExect?: boolean;
};

const HomeRouter: RouterType = {
  path: config.preLink + "/",
  component: HomeIndex,
  root: [],
  notExect: false,
};

const JoinUsRouter: RouterType = {
  path: config.preLink + "/joinus",
  component: JoinUs,
  root: [],
  notExect: false,
};

const Routers: RouterType[] = [HomeRouter, JoinUsRouter];
export { Routers };
