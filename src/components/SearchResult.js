import React, {useContext, useEffect} from "react";
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

  const { currentVideoId, setCurrentVideoId } = useContext(GlobalContext);



  const handleClick = id => {
    setCurrentVideoId(id)
    // open youtube in new tab
  };

  let renderResult = "<div>Loading</div>"

  renderResult = videos.map(video => {
    const { snippet } = video;
    return (
      <React.Fragment key={video.id.videoId}>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(video.id.videoId)}
        >
          <ListItemAvatar>
            <Avatar className="searchThumb"
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
              alt={snippet.title}
              src={snippet.thumbnails.default.url}
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
