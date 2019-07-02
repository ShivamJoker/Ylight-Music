import React from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import circleSvg from "../../images/dottedCircle.svg";

const MusicArt = ({ data }) => {
  const bgStyle = {
    background: `url(${circleSvg}) no-repeat`,
    padding: "18px"
  };

  // if its less than 400 width we will use default hq thumbnail
  const checkImg = e => {
    if (e.target.naturalWidth < 400) {
      e.target.src = data.sdThumbnail;
    }
  };

  // double tap to like the song
  const likeSong = ()=>{
    console.log(data.id)
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" onDoubleClickCapture={likeSong}>
      <div style={bgStyle}>
        <Avatar
          className="searchThumb"
          style={{
            width: "215px",
            height: "215px",
            boxShadow: "#0000008c 1px 3px 8px"
          }}
          alt="video thumbnail"
          src={data.maxThumbnail}
          imgProps={{ onLoad: e => checkImg(e) }}
        />
      </div>
      <br />
      <Typography color="primary" variant="h5">
        {data.title.slice(0, 20) + "..."}
      </Typography>
      <Typography color="primary" variant="subtitle1">
        {data.channelTitle}
      </Typography>
      <br />
    </Grid>
  );
};

export default MusicArt;
