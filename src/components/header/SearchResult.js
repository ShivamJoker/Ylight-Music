import React from "react";

import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText
} from "@material-ui/core";


const SearchResult = ({ videos }) => {


 let renderResult = []

  renderResult = videos.map(video => {
    return (
      <>
        <ListItem alignItems="flex-start" button>
          <ListItemAvatar>
            <Avatar
              style={{ width: "60px", height: "60px" }}
              alt={video.snippet.title}
              src={video.snippet.thumbnails.default.url}
            />
          </ListItemAvatar>
          <ListItemText
            primary={video.snippet.title}
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                {video.snippet.channelTitle}
              </Typography>
            }
          />
        </ListItem>
        <Divider />
      </>
    );
  });

  return <List>{renderResult}</List>;
};

export default SearchResult;
