import React, { useContext, useState, useEffect } from "react";

import { Snackbar } from "@material-ui/core";

import { GlobalContext } from "./GlobalState";

const SnackbarMessage = () => {
  const [isOpen, setOpen] = useState(false);
  const [{ snackbarMsg }, dispatch] = useContext(GlobalContext);

  const setSnackbarMsg = React.useCallback(
    data => {
      dispatch({ type: "setSnackbarMsg", snippet: data });
    },
    [dispatch]
  );
  useEffect(() => {
    if (snackbarMsg) {
      setOpen(true);
    }
  }, [snackbarMsg, setSnackbarMsg]);

  function handleClose() {
    console.log("closed");
    setOpen(false);
    setSnackbarMsg(null);
    // we will set back it to null otherwise it wont fire for the same
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      autoHideDuration={3000}
      open={isOpen}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      onClose={handleClose}
      message={<span id="message-id">{snackbarMsg}</span>}
    />
  );
};

export default SnackbarMessage;
