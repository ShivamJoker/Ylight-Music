import React from "react";

import "typeface-roboto";
import { GlobalState } from "./GlobalState";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <GlobalState>
      <ThemeProvider />
    </GlobalState>
  );
}

export default App;
