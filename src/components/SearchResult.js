import React, {useContext} from "react";
import { GlobalContext } from "./GlobalState";
import '../style.css'
import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText
} from "@material-ui/core";


const Entities = require("html-entities").XmlEntities;

const entities = new Entities();


const SearchResult = ({ videos }) => {

  const {  setCurrentVideoId } = useContext(GlobalContext);
  const {  setMusicArt } = useContext(GlobalContext);
  const {  setCurrentVideoSnippet } = useContext(GlobalContext);



  const handleClick = (video) => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: video.id.videoId,
      title: entities.decode(video.snippet.title),
      channelTitle: entities.decode(video.snippet.channelTitle),
      maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/default.jpg`
      // this is the url of the max resolution of thumbnail 
    })
  };

  let renderResult = "<div>Loading</div>"

  renderResult = videos.map(video => {
    const { snippet } = video;
    return (
      <React.Fragment key={video.id.videoId}>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(video)}
        >
          <ListItemAvatar>
            <Avatar className="searchThumb"
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
      </React.Fragment>
    );
  });

  return <List>{renderResult}</List>;
};

export default SearchResult;
