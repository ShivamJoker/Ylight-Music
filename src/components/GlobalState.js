import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalState = props => {
  const [searchState, setSearchState] = useState("home");
  // there will be three types of state
  // home,clicked, searching, completed
  const [searchResult, setSearchResult] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        searchState,
        setSearchState,
        searchResult,
        setSearchResult,
        currentVideoId,
        setCurrentVideoId
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
