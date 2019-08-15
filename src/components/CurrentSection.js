import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import FeedbackForm from './sections/FeedbackForm'

import { GlobalContext } from "./GlobalState";
import SearchResult from "./SearchResult";
import {
  getHistory,
  getLikedSongs,
  getDownloadedSongs
} from "../external/saveSong";

import { db } from "../external/saveSong";
import PrivacyPage from "./sections/PrivacyPage";
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

const CurrentSection = ({ history, location }) => {
  const { searchState } = useContext(GlobalContext);
  const { searchResult } = useContext(GlobalContext);
  const { currentVideoSnippet } = useContext(GlobalContext);

  const [songsHistoryState, setSongsHistory] = useState([]);
  const [songsLikedState, setSongsLiked] = useState([]);
  const [songsDownloadedState, setSongsDownloaded] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [redirectState, setRedirectState] = useState(null);

  function handleChange(event, newValue) {
    setTabValue(newValue);
  }

  const fetchSongs = useCallback(async () => {
    //it's same as the orders of our tabs
    switch (tabValue) {
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
  }, [tabValue]);

  useEffect(() => {
    fetchSongs();
  }, [tabValue, fetchSongs]);

  useEffect(() => {
    fetchSongs();
    console.log("fetching the songs");
  }, [updateCount, fetchSongs]);

  useEffect(() => {
    db.on("changes", () => {
      setUpdateCount(c => c + 1);
    });

    const isThisNewUser = localStorage.getItem("isThisNew");
    if (isThisNewUser === "no") {
      setRedirectState(true);
    }
  }, []);

  useEffect(() => {
    // we will redirect everytime user comes to root page
    if (redirectState && history.location.pathname === "/") {
      history.replace("/home");
    }
  }, [setRedirectState, history, redirectState]);

  // we will load the homepage with all the playlists
  const continueToHome = () => {
    localStorage.setItem("isThisNew", "no");
    history.replace("/home");
  };
  // the set tab value will keep the tab active on their route
  // there are 4 tabs so there will be 3 indexes
  return (
    <div>
      <br />

      <Route
        exact
        path="/"
        render={props => {
          return <LoginPage continueToHome={continueToHome} />;
        }}
      />
      <Route
        path="/search"
        render={props => <SearchResult videos={searchResult} />}
      />
      <Route
        path="/home"
        render={props => {
          setTabValue(0);
          return <HomePage />;
        }}
      />
      {/* <AnimatePresence exitBeforeEnter initial={false}> */}
      {/* <Switch key={location.pathname}> */}
      <Route
        path="/liked"
        render={props => {
          setTabValue(1);
          return <RenderDatabase songs={songsLikedState} {...props} />;
        }}
      />
      <Route
        path="/downloads"
        render={props => {
          setTabValue(2);
          return <RenderDatabase songs={songsDownloadedState} />;
        }}
      />
      <Route
        path="/history"
        render={props => {
          setTabValue(3);

          return <RenderDatabase songs={songsHistoryState} />;
        }}
      />
      {/* </Switch> */}
      {/* </AnimatePresence> */}

      <Route path="/privacy" component={PrivacyPage} />

      <Route path="/feedback" component={FeedbackForm} />

      <CustomTab
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <CustomTabs
          icon={<Home />}
          aria-label="Home"
          component={Link}
          to="/home"
        />

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
