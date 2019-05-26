import React, { useContext, useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Popper,
  CircularProgress
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { SearchBoxContext } from "../GlobalState";
import suggestSearch from "../../apis/suggestSearch";
import AutoSearchResult from "./AutoSearchResult";
import SearchResult from "./SearchResult";
import youtubeSearch from "../../apis/youtubeSearch";

let ytValue;

const SearchBox = () => {
  const context = useContext(SearchBoxContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [autoSearchData, setAutoSearch] = useState("");
  const [ytSearchQuery, setYtSearchQuery] = useState("hello");

  const [isSearchSelected, setSearchSelect] = useState(false);


  // get back the selected search data
  const onSearchSelect = result => {
    console.log(`result ${result}`)
    setYtSearchQuery("setting yt search");
    ytValue = result;

    console.log(ytValue);
    setSearchQuery(result);
    setSearchSelect(true);
    searchYt(ytValue); //when user selects then search on youtube

    console.log(`Data to be seached ${ytValue}`);
  };

  const onTyped = e => {

    setSearchQuery(e.target.value);
    ytValue = e.target.value;
    console.log("input changed detected value = " + ytValue);

    getAutocomplete();
  };

  // get autocomplete data form api

  const getAutocomplete = async () => {
    const response = await suggestSearch.get("", {
      params: {
        q: searchQuery
      }
    });
    setAutoSearch(response.data[1]);
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    console.log(ytValue);
    onSearchSelect(ytValue);
    // call the select function
  };

  // get youtube search result from api
  const [ytSearchData, setYtSearch] = useState([]);
  const searchYt = async data => {
    const res = await youtubeSearch.get("/search", {
      params: { q: data }
    });
    setYtSearch(res.data.items);
  };

  return (
    <>
      <IconButton
        onClick={() => context.setSearch(false)}
        color="inherit"
        aria-label="Menu"
      >
        <ArrowBack />
      </IconButton>
      <form onSubmit={e => onSearchSubmit(e)}>
        <InputBase
          fullWidth={true}
          placeholder="Search..."
          autoFocus={true}
          style={{ color: "#fff", paddingLeft: "16px" }}
          value={searchQuery}
          onChange={onTyped}
        />
      </form>
      <Popper style={{ width: "100%" }} open={true} placement="bottom">
        {isSearchSelected ? (
          // <CircularProgress/>
          <SearchResult videos={ytSearchData} />
        ) : (
          <AutoSearchResult
            results={autoSearchData}
            onSearchSelect={onSearchSelect}
          />
        )}
      </Popper>
    </>
  );
};

export default SearchBox;
