import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalState = props => {
  const [searchState, setSearchState] = useState("home");
  // there will be three types of state
  // home,clicked, searching, completed
  const [searchResult, setSearchResult] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [currentVideoSnippet, setCurrentVideoSnippet] = useState({});

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
        isDownloadOpen,
        setDownloadOpen
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
