import React, { useContext } from "react";
import { FixedSizeList as FixedList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText
} from "@material-ui/core";

import { GlobalContext } from "./GlobalState";




const RenderDatabase = ({ songs }) => {

  const { setCurrentVideoSnippet } = useContext(GlobalContext);

  const handleClick = song => {
    // set all the info of current clicked video in this object
    setCurrentVideoSnippet({
      id: song.videoId,
      audio: song.audio,
      title: song.title,
      channelTitle: song.channelTitle,
      maxThumbnail: `https://img.youtube.com/vi/${
        song.videoId
      }/maxresdefault.jpg`,
      sdThumbnail: `https://img.youtube.com/vi/${song.videoId}/sddefault.jpg`
      // this is the url of the max resolution of thumbnail
    });
  };


  const renderResult = songs.map(song => {
    return (
      <div key={song.videoId}>
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => handleClick(song)}
        >
          <ListItemAvatar>
            <Avatar
              className="searchThumb"
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
              alt={song.title}
              src={`https://img.youtube.com/vi/${song.videoId}/maxresdefault.jpg`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={song.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {song.channelTitle}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
    <Divider />
      </div>
    );
  });

  return (
    <List>
    {renderResult}
    </List>
  );

};

export default RenderDatabase;
