import React, { useContext } from "react";
import { GlobalContext } from "./GlobalState";

import { Button, Grid, Typography } from "@material-ui/core";
import bgImg from "../images/music-bg.svg";
import gIcon from "../images/google.svg";

const bgStyle = {
  background: `url(${bgImg}) no-repeat`,
  backgroundPositionX: "50%",
  marginTop: "50px",
  width: "100vw",
  height: "55vh"
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

  return (
    <div style={showLogin}>
      <div style={bgStyle} />
      <Grid container justify="center">
        <Button variant="outlined" color="primary">
          <img
            src={gIcon}
            height="25px"
            alt=""
            style={{ marginRight: "8px" }}
          />{" "}
          Sign In to personalize
        </Button>
      </Grid>
      <Typography variant="body1" color="primary" style={craftedStyle}>
        {" "}
        Handcrafted by Shivam
      </Typography>
    </div>
  );
};

export default LoginPage;
