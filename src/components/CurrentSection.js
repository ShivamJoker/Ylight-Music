import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  Suspense,
  lazy
} from "react";

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

import { GlobalContext } from "./GlobalState";
import {
  getHistory,
  getLikedSongs,
  getDownloadedSongs
} from "../external/saveSong";

import { db } from "../external/saveSong";
// import the db from save song

// pages
const LoginPage = lazy(() => import("./LoginPage"));
const RenderDatabase = lazy(() => import("./RenderDatabase"));
const SearchResult = lazy(() => import("./SearchResult"));
const HomePage = lazy(() => import("./sections/HomePage"));
const FeedbackForm = lazy(() => import("./sections/FeedbackForm"));
const PrivacyPage = lazy(() => import("./sections/PrivacyPage"));
const DonatePage = lazy(() => import("./sections/DonatePage"));
const ContributorsPage = lazy(() => import("./sections/ContributorsPage"));

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

let deferredPrompt = undefined;

window.addEventListener("beforeinstallprompt", e => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

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
  //
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

    if (deferredPrompt) {
      // show the prompt to install app
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    }
  };
  // the set tab value will keep the tab active on their route
  // there are 4 tabs so there will be 3 indexes
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
        <Route
          path="/app"
          render={props => {
            window.location.replace(
              "https://play.google.com/store/apps/details?id=com.ylightmusic.app"
            );
            return <div>Redirecting you to play store</div>;
          }}
        />

        <Route path="/privacy" component={PrivacyPage} />

        <Route path="/feedback" component={FeedbackForm} />
        <Route path="/donate" component={DonatePage} />
        <Route path="/contributors" component={ContributorsPage} />
        <div style={{ height: currentVideoSnippet.id ? "100px" : "50px" }} />
      </Suspense>
      {/* if the player is on then return 100px else 50px*/}
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
