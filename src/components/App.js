import React from "react";

import "typeface-roboto";
import { GlobalState } from "./GlobalState";
import AppContainer from "./AppContainer";

function App() {
  return (
    <GlobalState>
      <AppContainer />
    </GlobalState>
  );
}

export default App;

// this do not works 