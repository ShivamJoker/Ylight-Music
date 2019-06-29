import React, { useContext, useEffect, useState } from "react";
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

// your client id will be here
const clientId =
  "367279527036-u1jsag8ol4djckc0r9s3lu14jf096eei.apps.googleusercontent.com";

const gapi = window.gapi;
// get the gapi from window

const LoginPage = () => {
  const { isSearchOpen } = useContext(GlobalContext);

  const showLogin = {
    display: isSearchOpen ? "none" : "block"
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: clientId,
          scope: "https://www.googleapis.com/auth/youtube.readonly"
        })
        .then(() => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    });
  }, []);

  function loadClient() {
    gapi.client.setApiKey("AIzaSyBvt3FKkCTs05Lo0RMfYS6DCBHJELJn7_Q");
    return gapi.client
      .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(
        function() {
          console.log("GAPI client loaded for API");
          gapi.client.youtube.videos
            .list({
              part: "snippet",
              myRating: "like"
            })
            .then(response => {
              console.log(response);
            });
        },
        function(err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */

  const [isSignedIn, setIsSignedIn] = useState(false);

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      console.log("Signed in");
      setIsSignedIn(true);
      loadClient();
      console.log(
        gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse().id_token
      );
    } else {
      console.log("Signed out");
      setIsSignedIn(false);
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    // if user is currently signed in then sign it out else sign in
    if (isSignedIn) {
      gapi.auth2.getAuthInstance().signOut();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div style={showLogin}>
      <div style={bgStyle} />
      <Grid container justify="center">
        <Button variant="outlined" color="primary" onClick={handleAuthClick}>
          <img
            src={gIcon}
            height="25px"
            alt=""
            style={{ marginRight: "8px" }}
          />
          {isSignedIn ? "Sign Out " : "Sign In to personalize"}
          {console.log(isSignedIn)}
        </Button>
      </Grid>
      <Typography variant="body1" color="primary" style={craftedStyle}>
        Handcrafted by Shivam
      </Typography>
    </div>
  );
};

export default LoginPage;
