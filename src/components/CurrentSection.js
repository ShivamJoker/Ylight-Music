import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from "history";

import { Tabs, Tab, withStyles } from "@material-ui/core";
import {
  Home,
  Favorite,
  VideoLibrary,
  History,
  GetApp
} from "@material-ui/icons/";
import LoginPage from "./LoginPage";
import RenderDatabase from "./RenderDatabase";

import HomePage from "./sections/HomePage";

import { GlobalContext } from "./GlobalState";
import SearchResult from "./SearchResult";
import {
  getHistory,
  getLikedSongs,
  getDownloadedSongs
} from "../external/saveSong";

import youtubeSearch from "../apis/youtubeSearch";
import { db } from "../external/saveSong";
// import the db from save song

// custom styling the tab menus
const CustomTab = withStyles({
  root: {
    background: "#e91e63",
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: 1300
  },
  indicator: {
    display: "none"
  }
})(Tabs);

const CustomTabs = withStyles({
  root: {
    color: "#FFB2C1",
    "&:hover": {
      color: "#ffffffed",
      opacity: 1
    },
    "&$selected": {
      color: "#fff"
    },
    "&:focus": {
      color: "#FFFFFF"
    }
  },
  selected: {}
})(Tab);

const playlistsIds = {
  LatestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
  RomanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
  EdmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
  TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
  TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
  Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"
};

const CurrentSection = ({ history }) => {
  const { searchState } = useContext(GlobalContext);
  const { searchResult } = useContext(GlobalContext);
  const { currentVideoSnippet } = useContext(GlobalContext);

  const [songsHistoryState, setSongsHistory] = useState([]);
  const [songsLikedState, setSongsLiked] = useState([]);
  const [songsDownloadedState, setSongsDownloaded] = useState([]);
  const [value, setValue] = useState(0);

  // for home playlist
  const [songObj, setSongObj] = useState({});

  useEffect(() => {
    const getTrendingMusic = async () => {
      const res = await youtubeSearch.get("videos", {
        params: {
          chart: "mostPopular",
          videoCategoryId: "10",
          regionCode: localStorage.getItem("country_code")
        }
      });

      return res.data.items;
    };

    const getPlayListItems = async data => {
      const res = await youtubeSearch.get("playlistItems", {
        params: {
          playlistId: data
        }
      });
      return res.data.items;
    };

    // getTrendingMusic().then(data => {
    //   setSongObj(prevState => {
    //     return { ...prevState, ...{ trending: data } };
    //   });
    // });

    // getPlayListItems(playlistsIds.LatestSongs).then(data => {
    //   setSongObj(prevState => {
    //     return { ...prevState, ...{ latestSongs: data } };
    //   });
    // });

    // getPlayListItems(playlistsIds.RomanticSongs).then(data => {
    //   setSongObj(prevState => {
    //     return { ...prevState, ...{ romanticSongs: data } };
    //   });
    // });

    // getPlayListItems(playlistsIds.TopBolloywood).then(data => {
    //   setSongObj(prevState => {
    //     return { ...prevState, ...{ topBolloywood: data } };
    //   });
    // });
  }, []);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (searchState === "completed") {
      history.push("/search");
    }
  }, [searchState, history]);

  const fetchSongs = useCallback(async val => {
    //it's same as the orders of our tabs
    switch (val) {
      case 1:
        setSongsLiked(await getLikedSongs());
        break;

      case 2:
        setSongsDownloaded(await getDownloadedSongs());
        break;

      case 3:
        setSongsHistory(await getHistory());
        break;

      default:
        break;
    }
  }, [value]);

  useEffect(() => {
    fetchSongs(value);
  }, [value, fetchSongs]);

  useEffect(() => {
    db.songs.hook("updating", function(mod, pKey, obj, trans) {
      console.log(pKey, obj);
      fetchSongs(value);
    });
  }, [fetchSongs]);

  // the set tab value will keep the tab active on their route
  // there are 4 tabs so there will be 3 indexes
  return (
    <div>
      <br />
      <Route
        exact
        path="/"
        render={props => {
          setValue(0);
          return <LoginPage />;
        }}
      />
      <Route
        path="/search"
        render={props => <SearchResult videos={searchResult} />}
      />
      <Route
        path="/liked"
        render={props => {
          setValue(1);
          return <RenderDatabase songs={songsLikedState} {...props} />;
        }}
      />
      <Route
        path="/downloads"
        render={props => {
          setValue(2);
          return <RenderDatabase songs={songsDownloadedState} />;
        }}
      />
      <Route
        path="/history"
        render={props => {
          setValue(3);

          return <RenderDatabase songs={songsHistoryState} />;
        }}
      />

      <Route path="/privacy" component={"Your privacy page is here"} />

      <CustomTab
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <CustomTabs icon={<Home />} aria-label="Home" component={Link} to="/" />

        <CustomTabs
          icon={<Favorite />}
          aria-label="Liked"
          component={Link}
          to="/liked"
        />

        <CustomTabs
          icon={<GetApp />}
          aria-label="Downloads"
          component={Link}
          to="/downloads"
        />
        <CustomTabs
          icon={<History />}
          aria-label="History"
          component={Link}
          to="/history"
        />
      </CustomTab>
    </div>
  );
};

export default withRouter(CurrentSection);
