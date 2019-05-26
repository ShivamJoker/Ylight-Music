import React from "react";
import SimpleAppBar from "./header/SimpleAppBar";
import LoginPage from "./LoginPage";
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
        <LoginPage />
      </MuiThemeProvider>
    </GlobalState>
  );
}

export default App;
