import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider
} from "@material-ui/core";

import {
  MusicVideo,
  LibraryMusic,
  Shuffle,
  Repeat,
  KeyboardArrowUp
} from "@material-ui/icons";

import { GlobalContext } from "./GlobalState";

let renderResult;

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

const RelatedVideos = ({ id, onMaximizePlaylist }) => {
  const {
    relatedVideos,
    setRelatedVideos,
    setCurrentVideoSnippet
  } = useContext(GlobalContext);

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
  };

  if (relatedVideos.length > 1) {
    renderResult = relatedVideos.map(song => {
      return (
        <motion.li
          key={song.id.videoId}
          positionTransition={spring}
          
        >

        <ListItem
          // key={song.id.videoId}
          button
          onClick={() => handleClick(song)}
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
    return "Loading the playlist";
  }

  return (
    <div className={"RelatedVideoContainer"}>
      <Grid
        className={"playlistHeader"}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <LibraryMusic />
        <Typography variant="h5">Coming Next</Typography>
        <Shuffle onClick={handleShuffleClick} />
        <Repeat />
        <KeyboardArrowUp onClick={onMaximizePlaylist} />
      </Grid>
      <List dense={true}>
       {renderResult}
      </List>
    </div>
  );
};

export default RelatedVideos;
