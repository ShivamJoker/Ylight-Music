import React from "react";
import { IconButton } from "@material-ui/core/";
import { SkipNext } from "@material-ui/icons/";

const PlayPauseButton = () => {
  return (
    <IconButton color="primary" aria-label="Next">
      <SkipNext fontSize="large"/>
    </IconButton>
  );
};

export default PlayPauseButton