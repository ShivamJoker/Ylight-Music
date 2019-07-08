import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";

import { Button, Grid, Typography } from "@material-ui/core";
import bgImg from "../images/music-bg.svg";
import gIcon from "../images/google.svg";

import GoogleSignIn from "./GoogleSignIn";

const bgStyle = {
  background: `url(${bgImg}) no-repeat`,
  backgroundPositionX: "50%",
  marginTop: "50px",
  width: "100vw",
  height: "50vh"
};

const craftedStyle = {
  fontFamily: "Vibur, cursive",
  fontSize: "24px",
  width: "100%",
  textAlign: "center",
  letterSpacing: 0,
  marginTop: "40px"
};

const LoginPage = () => {
  const { isSearchOpen } = useContext(GlobalContext);

  const showLogin = {
    display: isSearchOpen ? "none" : "block"
  };

  const showSignIn = () => {
    // if user has already closed the popup dont show it
    if (localStorage.getItem("signInClosed") !== "true") {
      return <GoogleSignIn />;
    }
  };

  return (
    <div style={showLogin}>
      {/* {showSignIn()} */}

      <div style={bgStyle} />
      <Typography variant="h5" color="primary" align="center" style={{padding: "10px"}}>
      Listen to unilimited songs without any ads for free only on Ylight Music

      </Typography>
      <Typography variant="body1" color="primary" style={craftedStyle}>
        Handcrafted by Shivam
      </Typography>
    </div>
  );
};

export default LoginPage;
