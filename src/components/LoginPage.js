import React, {useContext} from "react";
import {SearchBoxContext} from './GlobalState'

import { Button, withStyles, Grid, SvgIcon } from "@material-ui/core";
import bgImg from "../images/music-bg.svg";
import gIcon from '../images/google.svg'

const bgStyle = {
  background: `url(${bgImg}) no-repeat`,
  backgroundPositionX: "50%",
  marginTop: "50px",
  width: "100vw",
  height: "55vh"
};





const LoginPage = () => {
  const {isSearchOpen} = useContext(SearchBoxContext)

  const showLogin = {
    display: isSearchOpen ? "none" : "block"
  }

  return (
    <div style={showLogin}>
      <div style={bgStyle} />
      <Grid container justify="center">
        <Button variant="outlined" color="primary">
          <img src={gIcon} height="25px" alt="" style={{marginRight: "8px"}}/>  Sign In to personalize
        </Button>
      </Grid>
    </div>
  );
};


export default LoginPage;
