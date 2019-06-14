import React, { useEffect, useContext, useState } from "react";
import YouTube from "react-youtube";

import { GlobalContext } from "../GlobalState";

const MainPlayer = () => {
  const { currentVideoId, setCurrentVideoId } = useContext(GlobalContext);

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (currentVideoId !== null) {
      player.loadVideoById(currentVideoId);
    }
    console.log(currentVideoId);
  }, [currentVideoId]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      
    }
  };

  const onReady = e => {
    setPlayer(e.target);
    // e.target.loadVideoById("pmId7mXRKS4")
  };

  const playerStyle = {
      position: "absolute",
      top: 0,
      right: 0,
      background: "#fff",
      width: "100%",
      height: "50%",
      opacity: ".5",
      paddingTop: "50px"
  }

  if (currentVideoId == null) {
    playerStyle.display = "none";
  } 
  return(
    <div style={playerStyle}>
    <YouTube opts={opts} onReady={onReady} />
  </div>
  )

};

export default MainPlayer;
