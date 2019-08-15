import React from "react";
import { IconButton } from "@material-ui/core/";
import { SkipPrevious } from "@material-ui/icons/";

const PlayPauseButton = ({playPrevious}) => {
  return (
    <IconButton color="primary" aria-label="Pause" onClick={playPrevious}>
      <SkipPrevious fontSize="large"/>
    </IconButton>
  );
};

export default PlayPauseButton