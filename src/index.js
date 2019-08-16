import React from "react";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
serviceWorker.register();
