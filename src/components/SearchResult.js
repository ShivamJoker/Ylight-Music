import React, { useContext } from "react";
import { motion, useCycle } from "framer-motion";
import { Link } from 'react-router-dom';

import { GlobalContext } from "./GlobalState";

import youtubeSearch from "../apis/youtubeSearch";
import "../style.css";
import {
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText
} from "@material-ui/core";

const Entities = require("html-entities").XmlEntities;

const entities = new Entities();

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.18, delayChildren: 0.5 }
  },
  closed: {
    transition: { staggerChildren: 0.15, staggerDirection: -1 }
  }
};

const SearchResult = ({ videos }) => {
  const [isOpen, setisOpen] = useCycle(false, true);

  const { setCurrentVideoSnippet, setRelatedVideos } = useContext(
    GlobalContext
  );

  const handleClick = video => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: video.id.videoId,
      title: entities.decode(video.snippet.title),
      channelTitle: entities.decode(video.snippet.channelTitle),
      maxThumbnail: `https://img.youtube.com/vi/${
        video.id.videoId
      }/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${
        video.id.videoId
      }/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
    const searchRelated = async () => {
      const res = await youtubeSearch.get("/search", {
        params: {
          relatedToVideoId: video.id.videoId,
          maxResults: 10
        }
      });
      setRelatedVideos(res.data.items);
    };
    searchRelated();
  };

  React.useEffect(() => {
      setisOpen(true);
  }, []);

  const renderResult = videos.map(video => {
    const { snippet } = video;
    return (
      <motion.div variants={liVariants} key={video.id.videoId}>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(video)}
          component={Link}
          to={`/song/${video.id.videoId}`}
        >
          <ListItemAvatar>
            <Avatar
              className="searchThumb"
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
              alt={snippet.title}
              src={snippet.thumbnails.high.url}
            />
          </ListItemAvatar>
          <ListItemText
            primary={entities.decode(snippet.title)}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {snippet.channelTitle}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </motion.div>
    );
  });

  return (
    <motion.div
      variants={ulVariants}
      // animate={isOpen ? "open" : "closed"}
      initial={true}
    >
      {renderResult}
    </motion.div>
  );
};

export default SearchResult;
