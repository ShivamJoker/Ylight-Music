import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import SongCard from "./SongCard";

import youtubeSearch from "../../apis/youtubeSearch";

// make a permanent playlist object with few songs catergory


const HomePage = ({songObj}) => {


  return (
    <>
      <SongCard songs={songObj.trending} categotyTitle={"Trending Now"} />

      <SongCard songs={songObj.latestSongs} categotyTitle={"Latest Music"} />

      <SongCard songs={songObj.romanticSongs} categotyTitle={"Romantic Mood"} />

      <SongCard songs={songObj.topBolloywood} categotyTitle={"Top Bollywood"} />
    </>
  );
};

export default HomePage;
