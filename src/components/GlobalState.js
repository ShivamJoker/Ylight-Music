import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalState = props => {
  const [searchState, setSearchState] = useState("home");
  // there will be three types of state
  // home,clicked, searching, completed
  const [searchResult, setSearchResult] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(false); //this will contain the message for actions
  const [currentVideoSnippet, setCurrentVideoSnippet] = useState({});
  //this is for changing the theme
  const [themeSelectValue, setThemeSelectValue] = useState("Default");

  return (
    <GlobalContext.Provider
      value={{
        searchState,
        setSearchState,
        searchResult,
        setSearchResult,
        currentVideoSnippet,
        setCurrentVideoSnippet,
        menuOpen,
        setMenuOpen,
        relatedVideos,
        setRelatedVideos,
        snackbarMsg,
        setSnackbarMsg,
        themeSelectValue,
        setThemeSelectValue
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
