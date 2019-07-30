import React, { useEffect, useContext, useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import { useSwipeable } from "react-swipeable";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { motion } from "framer-motion";

import PlayPauseButton from "./PlayPauseButton";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import MusicArt from "./MusicArt";
import TimelineController from "./TimelineController";
import VolumeController from "./VolumeController";
import MiniMusicArt from "./MiniMusicArt";
import RelatedVideos from "../RelatedVideos";
import getAudioLink from "../../apis/getAudioLink";
import youtubeSearch from "../../apis/youtubeSearch";
import { updatePlayingSong } from "../../external/saveSong";

import "../../external/saveCountry";

import "../../style.css";

import { GlobalContext } from "../GlobalState";
let songIndex = 0;

// window.onbeforeunload = function() {
//   return 'You have unsaved changes!';
// }
const history = createBrowserHistory();

const MainPlayer = () => {
  const {
    currentVideoSnippet,
    setCurrentVideoSnippet,
    relatedVideos
  } = useContext(GlobalContext);

  const [audioState, setAudioState] = useState(null);
  // there will be 4 states
  // loading, loaded, playing, paused

  const [currentTime, setCurrentTime] = useState(0);

  const [playerState, setPlayerState] = useState(null);
  // there will be 3 states
  // maximized, minimized, playlist

  const [minimized, setMinimized] = useState(true);
  const [rating, setRating] = useState("none");

  const body = document.querySelector("body");

  const audioPlayer = useRef();
  const player = audioPlayer.current;

  useEffect(() => {
    const getAudio = async data => {
      // audioPlayer.current.src = "";
      // maximize the player every time id changes
      // only if playlist is not open
      if (playerState !== "playlist") {
        setPlayerState("maximized");
      }
      setAudioState("loading");
      const res = await getAudioLink.get("/song", {
        params: { id: data }
      });

      // set the audio data
      audioPlayer.current.src = res.data;
      // audioPlayer.current.load();
    };

    if (currentVideoSnippet.audio) {
      console.log("yes its downloaded we will play from local file");
      // maximize the player every time id changes
      setPlayerState("maximized");
      setAudioState("loading");
      audioPlayer.current.src = window.URL.createObjectURL(
        currentVideoSnippet.audio
      );
    } else if (currentVideoSnippet.id) {
      getAudio(currentVideoSnippet.id);
    }

    if (currentVideoSnippet.id) {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: currentVideoSnippet.title,
          artist: currentVideoSnippet.channelTitle,
          artwork: [
            {
              src: currentVideoSnippet.sdThumbnail,
              sizes: "512x512",
              type: "image/png"
            }
          ]
        });
        navigator.mediaSession.setActionHandler("play", function() {
          /* Code excerpted. */
          audioPlayer.current.play();
        });
        navigator.mediaSession.setActionHandler("pause", function() {
          /* Code excerpted. */
          audioPlayer.current.pause();
        });
        navigator.mediaSession.setActionHandler("previoustrack", function() {
          /* Code excerpted. */
        });
        navigator.mediaSession.setActionHandler("nexttrack", function() {
          playNext();
        });
      }
    }

    // set rating to none when we load new song
    setRating("none");
    console.log("initial render");

    console.log(currentVideoSnippet);
  }, [currentVideoSnippet]);

  const playNext = () => {
    const video = relatedVideos[songIndex];
    console.log(songIndex);
    setCurrentVideoSnippet({
      id: video.id.videoId,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${
        video.id.videoId
      }/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${
        video.id.videoId
      }/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
    // keep increasing the song index
    songIndex++;
  };

  // useEffect(() => {
  //   if (audioState === "playing") {
  //     updatePlayingSong(currentVideoSnippet);
  //   }
  // }, [audioState, currentVideoSnippet]);

  let playerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    background: "#fff",
    width: "100%",
    height: "100vh",
    zIndex: 1400,
    display: "inline block",
    transition: "all .3s ease"
  };

  if (playerState === "minimized") {
    playerStyle.transform = "translateY(calc(100% - 106px))";
    playerStyle.background = "#e91e63";
    playerStyle.zIndex = 0;
    // playerStyle.bottom = "48px";
    // calculate the top height and we are subtracting 148px becz
    // 48 is the value of menu bar and 100px is minimized height
    // make body overflow scroll 😝
    body.style.overflow = "auto";
  }

  if (playerState === "maximized") {
    // make body overflow hidden 🙈
    body.style.overflow = "hidden";
  }

  if (playerState === "playlist") {
    playerStyle.transform = "translateY(-390px)";
  }

  const expandPlayer = () => {
    if (playerState === "minimized") {
      setPlayerState("maximized");
      setMinimized(true);
    }
    history.push(`/song/${currentVideoSnippet.id}`);
  };

  const maximizePlaylist = () => {
    setPlayerState("playlist");
    console.log("Maximize the playlist")
  };

  const timeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };

  const updateSongDB = async () => {
    const rating = await updatePlayingSong(currentVideoSnippet);
    //  it will update song on db and return the rating
    setRating(rating);
    console.log(rating);
  };

  const swipeHandler = useSwipeable({
    onSwipedDown: e => {
      setPlayerState("minimized");
      history.goBack();
    },
    onSwipedUp: e => {
      if (playerState === "minimized") {
        setPlayerState("maximized");
      }
    },
    onSwipedRight: e => {
      const playTimeout = setTimeout(() => {
        clearTimeout(playTimeout);
        playNext();
      }, 250);
    }
  });

  useEffect(() => {
    // Listen for changes to the current location.
    const unlisten = history.listen(location => {
      // location is an object like window.location
      if (location.pathname.slice(1, 5) === "song") {
        // setPlayerState("maximized");
      } else {
        // setPlayerState("minimized");
      }
    });
  }, []);

  useEffect(() => {
    console.log(playerState)
  }, [playerState])

  const returnMaximizedPlayer = () => {
    if (playerState === "maximized" || playerState === "playlist") {
      return (
        <>
          <VolumeController player={player} setPlayerState={setPlayerState} />
          <MusicArt
            data={currentVideoSnippet}
            rating={rating}
            audioEl={player}
          />
          <TimelineController currentTime={currentTime} player={player} />
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <PreviousButton />
            <PlayPauseButton player={player} audioState={audioState} />
            <NextButton onPlayNext={playNext} />
          </Grid>
          <RelatedVideos onMaximizePlaylist={maximizePlaylist} />
        </>
      );
    }
  };

  const returnMinimizedPlayer = () => {
    if (playerState === "minimized") {
      return (
        <>
          <MiniMusicArt
            // we are making an object for props we will pass it to play pause button through mini music art
            playPause={{
              player: player,
              minimized: minimized,
              audioState: audioState
            }}
            data={currentVideoSnippet}
          />
          <TimelineController
            currentTime={currentTime}
            player={player}
            minimized={minimized}
          />
        </>
      );
    }
  };

  const fetchAndSetCurrentVideoSnippet = id => {
    youtubeSearch
      .get("videos", {
        params: {
          id: id
        }
      })
      .then(res => {
        const item = res.data.items[0];
        console.log(currentVideoSnippet);
        setCurrentVideoSnippet({
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          maxThumbnail: `https://img.youtube.com/vi/${
            item.id
          }/maxresdefault.jpg`,
          sdThumbnail: `https://img.youtube.com/vi/${item.id}/sddefault.jpg`
          // this is the url of the max resolution of thumbnail
        });
      });
  };

  const renderWholePlayer = props => {
    // console.log(match.params.songId);

    // if there is no current sinppet we will make it
    if (!currentVideoSnippet.id) {
      fetchAndSetCurrentVideoSnippet(props.match.params.songId); // math will give the song id from
    }
    return (
      <div
        // drag="y"
        // dragConstraints={{ top: 0, bottom: 600 }}
        style={playerStyle}
        onClick={expandPlayer}
        {...swipeHandler}
      >
        {returnMaximizedPlayer()}
        {returnMinimizedPlayer()}
        <audio
          src=""
          onTimeUpdate={timeUpdate}
          onLoadStart={() => {
            setAudioState("loading");
          }}
          onLoadedData={updateSongDB}
          // onCanPlay={() => setAudioState("loaded")}
          onPlay={() => setAudioState("playing")}
          onPlaying={() => setAudioState("playing")}
          onPause={() => setAudioState("paused")}
          onEnded={playNext}
          autoPlay
          ref={audioPlayer}
        />
      </div>
    );
  };

  if (currentVideoSnippet.id) {
    return renderWholePlayer();
  } else {
    console.log("nothing found");
    return (
      <Router>
        <Route path="/song/:songId" component={renderWholePlayer} />
      </Router>
    );
  }
};

export default MainPlayer;
