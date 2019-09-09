import React from "react";
import { Typography } from "@material-ui/core";
import { SkipNext, Close } from "@material-ui/icons";
import PlayPauseButton from "./PlayPauseButton";
import "./MiniMusicStyle.css";

const styles = {};

const MiniMuiscArt = ({ playPause, data, playNext, emptyPlayer }) => {
  const getThumbnail = () => {
    // if the thumbnail is downloaded then get it from database or else use the url to fetch
    if (data.thumbnail) {
      return window.URL.createObjectURL(data.thumbnail);
    } else {
      return data.sdThumbnail;
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"overflow-hidden"}>
        <div className="details">
          <Typography variant="body1">{data.title}</Typography>
          <Typography variant="body2">{data.channelTitle}</Typography>
        </div>
        <div className="buttons">
          <SkipNext onClick={playNext} />
          <Close onClick={emptyPlayer} />
        </div>
        <div className={"miniArtContainer"}>
          <div className={"mainArt"}>
            <img
              className={"miniArtImg"}
              src={getThumbnail()}
              alt="music art"
            />
            <PlayPauseButton
              player={playPause.player}
              minimized={playPause.minimized}
              audioState={playPause.audioState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMuiscArt;
