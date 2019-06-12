import React from "react";
import SimpleAppBar from "./header/SimpleAppBar";
import MainPlayer from './player/MainPlayer'
import CurrentSection from './CurrentSection'
import { GlobalState } from "./GlobalState";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: pink
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <GlobalState>
      <MuiThemeProvider theme={theme}>
        <SimpleAppBar />
        <CurrentSection />
        <MainPlayer/>
      </MuiThemeProvider>
    </GlobalState>
  );
}

export default App;
