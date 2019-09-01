import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import SimpleAppBar from "./header/SimpleAppBar";
import MainPlayer from "./player/MainPlayer";
import SwipeMenu from "./SwipeMenu";
import CurrentSection from "./CurrentSection";
import SnackbarMessage from "./SnackbarMessage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import "typeface-roboto";

import { GlobalContext } from "./GlobalState";
import { useCheckDarkmode } from "./sections/SettingsPage";

const body = document.querySelector("body");

function App() {
  const { themeSelectValue } = useContext(GlobalContext);

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

  const { checkDarkMode } = useCheckDarkmode();

  useEffect(() => {
    checkDarkMode();
  }, []);

  const [theme, setTheme] = useState(defaultTheme);
  const muiTheme = createMuiTheme(theme);

  useEffect(() => {
    if (themeSelectValue === "Dark") {
      body.classList.add("dark");
      setTheme(prevState => {
        return {
          ...prevState,
          palette: { type: "dark", ...prevState.palette }
        };
      });
    } else {
      body.classList.remove("dark");
      setTheme(defaultTheme);
    }
    console.log(theme);
  }, [themeSelectValue]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <SimpleAppBar />
        <CurrentSection />
        <MainPlayer />
        <SwipeMenu />
      </Router>
      <SnackbarMessage />
    </MuiThemeProvider>
  );
}

export default App;
