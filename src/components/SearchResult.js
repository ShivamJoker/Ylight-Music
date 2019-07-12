import React, { useContext } from "react";
import posed from "react-pose";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

const ItemsContainer = posed.div({
  open: {
    x: "0%",
    delayChildren: 200,
    staggerChildren: 50
  }
  // closed: { x: '-100%', delay: 300 }
});

const Item = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

const SearchResult = ({ videos }) => {
  const [isOpen, setisOpen] = React.useState(false);

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
          maxResults: 20
        }
      });
      setRelatedVideos(res.data.items);
    };
    searchRelated();
  };

  React.useEffect(() => {
    setTimeout(() => {
      setisOpen(true);
    }, 0);
  }, []);

  const renderResult = videos.map(video => {
    const { snippet } = video;
    return (
      <Item key={video.id.videoId}>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(video)}
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
      </Item>
    );
  });

  return (
    <ItemsContainer pose={isOpen ? "open" : "closed"}>
      {renderResult}
    </ItemsContainer>
  );
};

export default SearchResult;
