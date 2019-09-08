import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { GlobalContext } from "../GlobalState";

import SearchBox from "./SearchBox";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide
} from "@material-ui/core/";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import { Menu, Search } from "@material-ui/icons/";

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    textAlign: "center",
    width: "calc(100% - 96px)"
  },
  input: {
    color: "#fff"
  }
};

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function SimpleAppBar(props) {
  const [{ searchState }, dispatch] = useContext(GlobalContext);

  const setMenuOpen = data => {
    console.log(data);
    dispatch({ type: "setMenuOpen", snippet: data });
  };
  const setSearchState = React.useCallback(
    data => {
      console.log(data);
      dispatch({ type: "setSearchState", snippet: data });
    },
    [dispatch]
  );

  React.useEffect(() => {
    // if the page is on search we will change the search state
    const changeAppBar = () => {
      const path = props.history.location.pathname;
      if (path === "/search") {
        setSearchState("searching");
      } else {
        setSearchState("home");
      }
      console.log("history change detected in app bar");
    };

    changeAppBar();
    const unlisten = props.history.listen(location => {
      changeAppBar();
    });
  }, [setSearchState, props.history]);

  const toggleSearch = () => {
    if (searchState === "home") {
      return (
        <>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" style={styles.title}>
            Ylight Music
          </Typography>
          <IconButton
            onClick={() => setSearchState("clicked")}
            color="inherit"
            aria-label="Search"
          >
            <Search />
          </IconButton>
        </>
      );
    } else {
      return <SearchBox />;
    }
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar id="navbar" position="sticky">
          <Toolbar>{toggleSearch()}</Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}

export default withRouter(SimpleAppBar);
