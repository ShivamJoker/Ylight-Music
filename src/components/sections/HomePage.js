import React, { useState, useEffect } from "react";
import SongCard from "./SongCard";

import youtubeSearch from "../../apis/youtubeSearch";

// make a permanent playlist object with few songs catergory

const playlistsIds = {
  latestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
  romanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
  edmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
  TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
  TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
  Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"
};

const getPlayListItems = async data => {
  const res = await youtubeSearch.get("playlistItems", {
    params: {
      playlistId: data
    }
  });
  console.log(res.data.items);
};

// getPlayListItems("PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy");

// getTrendingMusic();

const HomePage = () => {
  const [trendingSongs, setTrendingSongs] = useState(null);

  useEffect(() => {
    const getTrendingMusic = async data => {
      const res = await youtubeSearch.get("videos", {
        params: {
          chart: "mostPopular",
          videoCategoryId: "10",
          maxResult: "5",
          regionCode: localStorage.getItem("country_code")
        }
      });
      setTrendingSongs(res.data.items);
    };
    // getTrendingMusic();
  }, []);

  if (trendingSongs) {
    return (
      <div
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
          // height: "300px",
          whiteSpace: "nowrap"
        }}
      >
        <SongCard songs={trendingSongs} />
      </div>
    );
  } else {
    return null;
  }
};

export default HomePage;
