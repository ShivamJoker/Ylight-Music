import React, { useState } from "react";
import { IconButton, Grid } from "@material-ui/core/";
import Slider from "@material-ui/lab/Slider";
import { VolumeUp, ExpandMore } from "@material-ui/icons/";

const VolumeController = ({ player, setPlayerState }) => {
  const [volume, setVolume] = useState(100);

  const volumeChange = (e, newVal) => {
    setVolume(newVal);
    player.volume = newVal / 100;
    //
  };

  const minimizePlayer = () => {
    setPlayerState("minimized");
  };

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      style={{ padding: " 0 10px", marginTop: "10px" }}
    >
      <Grid container spacing={1} style={{ maxWidth: "200px" }}>
        <Grid item>
          <VolumeUp color="primary" />
        </Grid>
        <Grid item xs={3}>
          <Slider value={volume} onChange={volumeChange} />
        </Grid>
      </Grid>
      <IconButton
        size="small"
        color="primary"
        aria-label="Pause"
        onClick={minimizePlayer}
      >
        <ExpandMore color="primary" fontSize="large" />
      </IconButton>
    </Grid>
  );
};

export default VolumeController;
