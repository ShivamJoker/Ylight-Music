import React, { useContext } from "react";

import { SearchBoxContext } from "../GlobalState";

import SearchBox from "./SearchBox";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core/";
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

function SimpleAppBar(props) {
  const {isSearchOpen, setSearch} = useContext(SearchBoxContext);

  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          {isSearchOpen ? (
            <SearchBox />
          ) : (
            <>
              <IconButton color="inherit" aria-label="Menu">
                <Menu />
              </IconButton>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                Ylight Music
              </Typography>
              <IconButton
                onClick={() => setSearch(true)}
                color="inherit"
                aria-label="Search"
              >
                <Search />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
