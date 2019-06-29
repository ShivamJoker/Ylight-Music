import React, { useState } from "react";
import { withStyles, Typography, Grid } from "@material-ui/core/";
import Slider from "@material-ui/lab/Slider";
import { PauseCircleFilled } from "@material-ui/icons/";

const PrettoSlider = withStyles({
  root: {
    height: 6
  },
  thumb: {
    height: 16,
    width: 16,
    marginTop: -5.3,
    marginLeft: -8,
    "&::before": {
      content: "''",
      height: "inherit",
      width: "inherit",
      position: "absolute",
      transform: "scale(1.6)",
      borderRadius: "50px",
      border: "1px solid"
    }
  },
  track: {
    height: 6,
    borderRadius: 4
  },
  rail: {
    height: 6,
    borderRadius: 4
  }
})(Slider);

const MiniSlider = withStyles({
  root: {
    height: 4,
    position: "relative",
    bottom: "-6px",
    color: "#FFFDFD",
    padding: 0
  },
  thumb: {
    display: "none"
  },
  track: {
    height: 4,
    borderRadius: 0
  },
  rail: {
    height: 4,
    borderRadius: 0
  }
})(Slider);

const formatTime = secs => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.ceil(secs - minutes * 60);

  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

const TimelineController = ({ currentTime, player, minimized }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    player.currentTime = newValue;
  };

  const showDuration = () => {
    if (player) {
      if (player.duration) {
        return formatTime(player.duration);
      } else {
        return "0:00";
      }
    } else {
      return 0;
    }
  };

  // condition rendering
  if (minimized) {
    return (
      <MiniSlider
          value={currentTime}
          max={player ? player.duration : 0}
        />
    );
  } else {
    return (
      <div style={{ margin: "0 20px" }}>
        <Grid container direction="row" justify="space-between">
          <Typography variant="body1" color="primary">
            {formatTime(currentTime)}
          </Typography>
          <Typography variant="body1" color="primary">
            {showDuration()}
          </Typography>
        </Grid>

        <PrettoSlider
          value={currentTime}
          onChange={handleChange}
          max={player ? player.duration : 0}
        />
        
      </div>
    );
  }
};

export default TimelineController;
