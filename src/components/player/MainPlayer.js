import React, { useEffect, useContext, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { useSwipeable, Swipeable } from "react-swipeable";

import PlayPauseButton from "./PlayPauseButton";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import MusicArt from "./MusicArt";
import TimelineController from "./TimelineController";
import VolumeController from "./VolumeController";
import getAudioLink from "../../apis/getAudioLink";

import "../../external/saveCountry"

import "../../style.css";

import { GlobalContext } from "../GlobalState";

const MainPlayer = () => {
  const { currentVideoSnippet, setCurrentVideoSnippet } = useContext(
    GlobalContext
  );

  const [audioState, setAudioState] = useState(null);
  // there will be 4 states
  // loading, loaded, playing, paused

  const [currentTime, setCurrentTime] = useState(0);

  const [playerState, setPlayerState] = useState(null);
  // there will be 3 states
  // maximized, minimized, playlist

  const [minimized, setMinimized] = useState(true);

  const body = document.querySelector("body");

  const audioPlayer = useRef();
  const player = audioPlayer.current;

  useEffect(() => {
    const getAudio = async data => {
      audioPlayer.current.src = "";
      // maximize the player every time id changes
      setPlayerState("maximized");
      setAudioState("loading");
      const res = await getAudioLink.get("/song", {
        params: { id: data }
      });

      // set the audio data
      audioPlayer.current.src = res.data;
      audioPlayer.current.load();
    };

    if (currentVideoSnippet.id) {
      getAudio(currentVideoSnippet.id);
    }
    console.log(currentVideoSnippet.id);
  }, [currentVideoSnippet.id]);

  useEffect(() => {}, [playerState]);

  let playerStyle = {
    position: "fixed",
    right: 0,
    top: 0,
    background: "#fff",
    width: "100%",
    height: "100vh",
    zIndex: 1220,
    display: "inline block",
    overflow: "hidden",
    transition: "all .3s ease"
  };

  if (playerState === "minimized") {
    playerStyle.height = "100px";
    playerStyle.background = "#e91e63";
    // playerStyle.bottom = "48px";
    playerStyle.top = "calc(100vh - 148px)";
    // calculate the top height and we are subtracting 148px becz
    // 48 is the value of menu bar and 100px is minimized height
    // make body overflow scroll 😝
    body.style.overflow = "auto";
  }

  if (playerState === "maximized") {
    // make body overflow hidden 🙈
    body.style.overflow = "hidden";
  }


  const expandPlayer = () => {
    if (playerState === "minimized") {
      setPlayerState("maximized");
      setMinimized(true);
    }
  };

  const timeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const swipeHandler = useSwipeable({
    onSwipedDown: e => {
      setPlayerState("minimized");
      console.log("player swipped down");
    }
  });

  const returnMaximizedPlayer = () => {
    if (playerState === "maximized") {
      return (
        <>

          <VolumeController player={player} setPlayerState={setPlayerState} />
          <MusicArt data={currentVideoSnippet} />
          <TimelineController currentTime={currentTime} player={player} />
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <PreviousButton />
            <PlayPauseButton player={player} audioState={audioState} />
            <NextButton />
          </Grid>
        </>
      );
    }
  };

  const returnMinimizedPlayer = () => {
    if (playerState === "minimized") {
      return (
        <>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <PlayPauseButton player={player} minimized={minimized} audioState={audioState} />
            <NextButton minimized={minimized} />
          </Grid>
          <TimelineController currentTime={currentTime} player={player} minimized={minimized}/>
        </>
      );
    }
  };

  if (currentVideoSnippet.id) {
    return (
      <div style={playerStyle} onClick={expandPlayer} {...swipeHandler}>
        {returnMaximizedPlayer()}
        {returnMinimizedPlayer()}
        <audio
          src=""
          onTimeUpdate={timeUpdate}
          onLoadStart={() => setAudioState("loading")}
          // onCanPlay={() => setAudioState("loaded")}
          onPlay={() => setAudioState("playing")}
          onPlaying={() => setAudioState("playing")}
          onPause={() => setAudioState("paused")}
          autoPlay
          ref={audioPlayer}
        />
      </div>
    );
  } else {
    return <div />;
  }
};

export default MainPlayer;
