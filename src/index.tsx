import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { PageLoading } from "components/PageLoading";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "@/i18n";
import "./flexible";
import "./App.less";

const listen = () => {
  // if (document.readyState === "complete") {
  ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <App />
      </Suspense>
    </BrowserRouter>,
    document.getElementById("root")
  );
  // } else {
  //   // assert is loading
  //   ReactDOM.render(
  //     <React.StrictMode>
  //       <PageLoading />
  //     </React.StrictMode>,
  //     document.getElementById("root")
  //   );
  // }
};

document.onreadystatechange = listen;

serviceWorker.unregister();
