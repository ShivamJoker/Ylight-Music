import React from "react";
import { IconButton } from "@material-ui/core/";
import { SkipPrevious } from "@material-ui/icons/";

const PlayPauseButton = () => {
  return (
    <IconButton color="primary" aria-label="Pause">
      <SkipPrevious fontSize="large"/>
    </IconButton>
  );
};

export default PlayPauseButton