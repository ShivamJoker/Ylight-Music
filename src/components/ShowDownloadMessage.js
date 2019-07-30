import React, { useContext } from "react";

import { Snackbar } from "@material-ui/core";

import { GlobalContext } from "./GlobalState";

const ShowDownloadMessage = () => {
  const { isDownloadOpen, setDownloadOpen } = useContext(GlobalContext);

  function handleClose() {
    console.log("closed");
    setDownloadOpen(false);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      autoHideDuration={5000}
      open={isDownloadOpen}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      onClose={handleClose}
      message={<span id="message-id">Song Downloaded!</span>}
    />
  );
};

export default ShowDownloadMessage;
