import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import SimpleAppBar from "./header/SimpleAppBar";
import MainPlayer from "./player/MainPlayer";
import SwipeMenu from "./SwipeMenu";
import CurrentSection from "./CurrentSection";
import SnackbarMessage from "./SnackbarMessage";
import { GlobalState } from "./GlobalState";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: "#fafafa"
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <GlobalState>
      <MuiThemeProvider theme={theme}>
        <Router>
          <SimpleAppBar />
          <CurrentSection />
          <MainPlayer />
          <SwipeMenu />
        </Router>
        <SnackbarMessage />
      </MuiThemeProvider>
    </GlobalState>
  );
}

export default App;
