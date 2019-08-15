import React, { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Grid,
  Slider,
  LinearProgress,
  makeStyles,
  withStyles
} from "@material-ui/core/";

import {
  ExpandMore,
  GetApp,
  Reply,
  DoneOutline,
  Done
} from "@material-ui/icons/";
import VolumeController from "./VolumeController";
import { useSongMethods } from "../RenderDatabase";
import { downloadSong } from "../../external/saveSong";
import { GlobalContext } from "../GlobalState";

const DownloadLoader = withStyles({
  root: {
    height: 2,
    width: "70%",
    margin: "0 auto",
    transform: "translateY(-10px)"
  }
})(LinearProgress);

const TopBar = ({ song, player, setPlayerState, history }) => {
  const { snackbarMsg } = useContext(GlobalContext);
  const [isSongDownloaded, setSongDownloaded] = useState(false);
  const [isSongDownloading, setSongDownloading] = useState(false);

  const {
    handleDownload,
    handleRemoveSong,
    deleteDialogComponent
  } = useSongMethods();

  useEffect(() => {
    if (snackbarMsg === "Song Downloaded" || song.audio) {
      setSongDownloaded(true);
      setSongDownloading(false);
    }
  }, [snackbarMsg]);
  // if the song is downloaded we will change

  // share prompt using chrome web api
  const shareSong = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share This Song",
          text: `Hey Listen to ${song.title} on Ylight Music`,
          url: window.location.href //get the current window url
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    }
  };

  const minimizePlayer = () => {
    history.goBack()
    setPlayerState("minimized");
  };

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      style={{
        padding: " 0 10px",
        marginTop: "10px",
        position: "absolute",
        top: "0"
      }}
    >
      <VolumeController player={player} />
      {deleteDialogComponent}

      <Reply
        style={{ transform: " scaleX(-1) translateY(-2px)" }}
        onClick={shareSong}
        color="primary"
      />
      <div>
        {isSongDownloaded ? (
          <DoneOutline
            color="primary"
            onClick={() => handleRemoveSong(song.id)}
          /> //song will be removed
        ) : (
          <>
            <GetApp
              color="primary"
              onClick={() => {
                handleDownload(song.id);
                setSongDownloading(true);
              }}
            />
          </>
        )}
        {isSongDownloading ? <DownloadLoader color="primary" /> : null}
        {/* if the song is downloading we will show loading */}
      </div>

      <ExpandMore
        onClick={minimizePlayer}
        color="primary"
        fontSize="large"
        style={{ transform: "translateY(-7px)" }}
      />
    </Grid>
  );
};

export default TopBar;
