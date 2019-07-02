import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalState = props => {
  const [searchState, setSearchState] = useState("home");
  // there will be three types of state
  // home,clicked, searching, completed
  const [searchResult, setSearchResult] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
