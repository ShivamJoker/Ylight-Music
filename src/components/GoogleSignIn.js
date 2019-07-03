import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import gIcon from "../images/google.svg";

// your client id will be here
const clientId =
  "367279527036-u1jsag8ol4djckc0r9s3lu14jf096eei.apps.googleusercontent.com";

const gapi = window.gapi;
// get the gapi from window

const GoogleSignIn = () => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        console.log("Signed in");
        setIsSignedIn(true);
        // also close the popup
        setOpen(false);
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

    setTimeout(() => {
      setOpen(true);
    }, 2000);
    // show popup after two seconds
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


  function handleClose() {
    // we will locally store if user dont want to sign in
    localStorage.setItem("signInClosed", true)
    setOpen(false);
  }
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Sign In with your Google account ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After signing in you will be able to retrieve your liked songs and
            like or dislike a song on your YouTube account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Later
          </Button>
          <Button variant="outlined" color="primary" onClick={handleAuthClick}>
            <img
              src={gIcon}
              height="25px"
              alt=""
              style={{ marginRight: "8px" }}
            />
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GoogleSignIn;
