import React from "react";

import "typeface-roboto";
import { GlobalState } from "./GlobalState";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SimpleAppBar from "./header/SimpleAppBar";
import MainPlayer from "./player/MainPlayer";
import SwipeMenu from "./SwipeMenu";
import CurrentSection from "./CurrentSection";
import SnackbarMessage from "./SnackbarMessage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

import { useCheckDarkmode } from "./sections/SettingsPage";
import { GlobalContext } from "./GlobalState";

const body = document.querySelector("body");

const defaultTheme = {
  palette: {
    primary: pink,
    secondary: {
      main: "#fafafa"
    }
  },
  typography: {
    useNextVariants: true
  }
};

const darkTheme = {
  palette: {
    type: "dark",
    primary: pink,
    secondary: {
      main: "#fafafa"
    }
  },
  typography: {
    useNextVariants: true
  }
};

function App() {
  const muiDarkTheme = createMuiTheme(darkTheme);
  const muiDefaultTheme = createMuiTheme(defaultTheme);

  // this works i have just transfered AppContainer contents to here
  return (
    <GlobalState>
      <MuiThemeProvider
        theme={themeSelectValue === "Dark" ? muiDarkTheme : muiDefaultTheme}
      >
        <Router>
          <SimpleAppBar />
          <CurrentSection />
          <Route path={"/"} component={MainPlayer} />
          <SwipeMenu />
        </Router>
        <SnackbarMessage />
      </MuiThemeProvider>
    </GlobalState>
  );
}

export default App;
