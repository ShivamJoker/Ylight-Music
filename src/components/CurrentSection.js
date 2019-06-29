import React, { useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, withStyles } from "@material-ui/core";
import { Home, Favorite, VideoLibrary } from "@material-ui/icons/";
import LoginPage from "./LoginPage";

import { GlobalContext } from "./GlobalState";
import SearchResult from "./SearchResult";

// custom styling the tab menus
const CustomTab = withStyles({
  root: {
    background: "#e91e63",
    position: "fixed",
    bottom: "0",
    width: "100%"
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

const CurrentSection = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  function checkUserSearched() {
    if (searchState === "completed") {
      return <SearchResult videos={searchResult} />;
    }
  }

  const { searchState } = useContext(GlobalContext);
  const { searchResult } = useContext(GlobalContext);

  return (
    <div>
      {checkUserSearched()}
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <div>
          <LoginPage />
        </div>
        <div>This is not your home</div>
        <div>I will fuck you</div>
      </SwipeableViews>
      <CustomTab
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <CustomTabs icon={<Home />} aria-label="Home" />
        <CustomTabs icon={<Favorite />} aria-label="Liked" />
        <CustomTabs icon={<VideoLibrary />} aria-label="Library" />
      </CustomTab>
    </div>
  );
};

export default CurrentSection;
