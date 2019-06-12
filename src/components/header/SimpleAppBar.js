import React, { useContext } from "react";

import { GlobalContext } from "../GlobalState";

import SearchBox from "./SearchBox";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
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
  const { searchState, setSearchState } = useContext(GlobalContext);

  const { classes } = props;

  const toggleSearch = () => {
    if (searchState === "home") {
      return (
        <>
          <IconButton color="inherit" aria-label="Menu">
            <Menu />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">
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

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
