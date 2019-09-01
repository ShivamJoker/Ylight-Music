import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { GlobalState } from "./components/GlobalState";

ReactDOM.render(<GlobalState><App /></GlobalState>, document.getElementById("root"));

serviceWorker.register();
