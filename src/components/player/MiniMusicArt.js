import React from "react";
import {Typography} from '@material-ui/core'
import { SkipNext, Close } from "@material-ui/icons";
import PlayPauseButton from "./PlayPauseButton";
import "./MiniMusicStyle.css";

const styles = {};

const MiniMuiscArt = ({playPause, data}) => {
  return (
    <div className={"mainContainer"}>
      <div className={"overflow-hidden"}>
        <div className="details">
        <Typography variant="body1">{data.title.slice(0, 20)}</Typography>
        <Typography variant="body2">{data.channelTitle}</Typography>
        </div>
        <div className="buttons">
        <SkipNext/>
        <Close/>
        </div>
        <div className={"miniArtContainer"}>
          <div className={"mainArt"}>
            <img className={"miniArtImg"} src={data.maxThumbnail} alt="music art"/>
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
