import React from "react";

import {
  Card,
  makeStyles,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: 300,
    display: "inline-block",
    margin: "10px",
    whiteSpace: "pre-wrap"
  },
  media: {
    height: 160
  }
});
const MediaCard = ({ songs }) => {
  const classes = useStyles();
  

  const renderCards = songs.map(song => {
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={song.snippet.thumbnails.high.url}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              color="textSecondary"
            >
              {song.snippet.title.slice(0, 40) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  return <>{renderCards}</>;
};

export default MediaCard;
