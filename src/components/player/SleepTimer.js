import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  Switch,
  DialogActions,
  Button,
  FormControlLabel,
  FormControl,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { TimerOff, Timer } from "@material-ui/icons";
import { CircleSlider } from "react-circle-slider";

import "./SleepTimerStyle.css";

const setSleepTimeToLocalStorage = (time, alwaysOn) => {
  const sleepTimerSettings = JSON.stringify({ time: time, alwaysOn: alwaysOn });

  localStorage.setItem("sleepTimerSettings", sleepTimerSettings);
};

const getSleepTimeFromLocalStoarge = () => {
  const sleepTimerSettings = localStorage.getItem("sleepTimerSettings");
  return JSON.parse(sleepTimerSettings);
};

const removeSleepTimer = () => {
  localStorage.removeItem("sleepTimerSettings");
};

let timerTimeout;

function SleepTimer({ player }) {
  const [sliderValue, changeSliderValue] = useState(20);
  const [open, setOpen] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [isTimerSet, setIsTimerSet] = useState(false);

  const setTimer = time => {
    console.log("timer has been set with time", time);
    clearTimeout(timerTimeout);
    setIsTimerSet(true);
    timerTimeout = setTimeout(() => {
      player.pause(); //pause after music finished
    }, time * 60 * 1000);
  };

  useEffect(() => {
    const sleepTimerObj = getSleepTimeFromLocalStoarge();
    if (sleepTimerObj) {
      changeSliderValue(sleepTimerObj.time);
      setCheckbox(sleepTimerObj.alwaysOn);
    }

    //only set timer when there is no timer
    if (sleepTimerObj && sleepTimerObj.alwaysOn) {
      console.log(sleepTimerObj);
      setTimer(sleepTimerObj.time);
    }
    console.log(sleepTimerObj);
  }, []);

  const handleSetTimer = () => {
    setSleepTimeToLocalStorage(sliderValue, checkbox);
    //   then also set a set timeout
    // if there is any timer already clear it
    setOpen(false);
    setTimer(sliderValue);
  };

  const handleRemove = () => {
    removeSleepTimer();
    setIsTimerSet(false);
    setOpen(false);
  };

  return (
    <>
      {isTimerSet ? (
        <Timer color="primary" onClick={() => setOpen(true)} />
      ) : (
        <TimerOff color="primary" onClick={() => setOpen(true)} />
      )}
      <Dialog
        style={{ zIndex: 1400 }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography
          variant="h5"
          color="primary"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Pause Music After
        </Typography>
        <div className="container">
          <div className="textContainer">
            {sliderValue}
            <div className="minute">MINUTES</div>
          </div>
          <CircleSlider
            value={sliderValue}
            stepSize={5}
            onChange={value => changeSliderValue(value)}
            size={300}
            max={120}
            gradientColorFrom="#ec008c"
            gradientColorTo="#fc6767"
            knobRadius={25}
            progressWidth={30}
            circleWidth={30}
          />
        </div>

        <DialogActions>
          <FormControlLabel
            value="Always On"
            control={
              <Switch
                checked={checkbox}
                onChange={e => setCheckbox(e.target.checked)}
                value="checked always on"
                color="primary"
              />
            }
            label="ALWAYS"
            labelPlacement="end"
            style={{ color: "#e91e63" }}
          />
          <Button color="primary" onClick={handleRemove}>
            Remove
          </Button>

          <Button color="primary" onClick={handleSetTimer}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SleepTimer;
