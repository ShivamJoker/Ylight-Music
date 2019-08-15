import React, { useState, useContext } from "react";

import {
  SwipeableDrawer,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";
import { AccountCircle, Feedback, Info } from "@material-ui/icons";
import { Link } from "react-router-dom";

import gIcon from "../images/google.svg";

import { GlobalContext } from "./GlobalState";

const SwipeMenu = () => {
  const largeAvator = {
    width: "50px",
    height: "50px",
    margin: "25px 0",
    background: "#e91e63"
  };

 
  const { menuOpen, setMenuOpen } = useContext(GlobalContext);

  return (
    <SwipeableDrawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      onOpen={() => setMenuOpen(true)}
    >
      <div style={{ width: "300px" }}>
        <div
          style={{
            padding: "15px"
          }}
        >
          <Avatar
            style={largeAvator}
            alt="Remy Sharp"
            // src="/static/images/avatar/1.jpg"
          >
            <AccountCircle fontSize="large" />
          </Avatar>
          {/* <Button
            variant="outlined"
            color="primary"
            //  onClick={handleAuthClick}
          >
            <img
              src={gIcon}
              height="25px"
              alt=""
              style={{ marginRight: "8px" }}
            />
            Sign In
          </Button> */}
        </div>
        <Divider />

        <List component="nav" className={"pinkLists"}>

          <ListItem button component={Link} to="/feedback">
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button component={Link} to="/privacy">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Privacy & Policy" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default SwipeMenu;
