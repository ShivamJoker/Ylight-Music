import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider,
  LinearProgress
} from "@material-ui/core";

import {
  MusicVideo,
  LibraryMusic,
  Shuffle,
  Repeat,
  KeyboardArrowUp,
  KeyboardArrowDown,
  RepeatOne
} from "@material-ui/icons";

import { GlobalContext } from "./GlobalState";

let renderResult;

// written by @bushblade
const shuffle = arry =>
  arry.reduce(
    (acc, _, i) => {
      const rnd = Math.floor(Math.random() * acc.length),
        temp = acc[i];
      acc[i] = acc[rnd];
      acc[rnd] = temp;
      return acc;
    },
    [...arry]
  );

const RelatedVideos = ({
  toggleMaxPlaylist,
  setPlaylist,
  playerState,
  relatedVideos,
  setRelatedVideos,
  setIsRepeatOn,
  isRepeatOn
}) => {
  
  const { setCurrentVideoSnippet } = useContext(GlobalContext);

  const handleShuffleClick = () => {
    setRelatedVideos(shuffle(relatedVideos));
  };

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };
  const handleClick = video => {
    // set all the info of current clicked video in this object
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
    setPlaylist();
  };

  if (relatedVideos.length > 1) {
    renderResult = relatedVideos.map(song => {
      return (
        <motion.li key={song.id.videoId} positionTransition={spring}>
          <ListItem
            // key={song.id.videoId}
            button
            onClick={() => handleClick(song)}
            // component={Link}
            // replace
            // to={{ pathname: "/play", search: `?id=${song.id.videoId}` }}
          >
            <ListItemIcon>
              <MusicVideo style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText
              primary={song.snippet.title.slice(0, 40)}
              secondary={song.snippet.channelTitle.slice(0, 40)}
            />
          </ListItem>
        </motion.li>
      );
    });
  } else {
    return <LinearProgress/>;
  }

  const returnPlaylistExpandBtn = () => {
    if (playerState === "playlist") {
      return <KeyboardArrowDown onClick={toggleMaxPlaylist} />;
    } else {
      return <KeyboardArrowUp onClick={toggleMaxPlaylist} />;
    }
  };

  return (
    <div className="RelatedVideoContainer">
      <Grid
        className={"playlistHeader"}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <LibraryMusic />
        <Typography variant="h6">Coming Next</Typography>
        <Shuffle onClick={handleShuffleClick} />
        {/* this will show the repeat button and repeat the song */}
        {isRepeatOn ? <RepeatOne onClick={setIsRepeatOn}/> : <Repeat onClick={setIsRepeatOn}/>}
        {returnPlaylistExpandBtn()}
      </Grid>
      <List dense={true}>{renderResult}</List>
    </div>
  );
};

export default RelatedVideos;
