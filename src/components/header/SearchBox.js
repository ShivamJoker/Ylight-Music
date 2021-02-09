import React, { useContext, useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";

import {
  InputBase,
  IconButton,
  Popper,
  CircularProgress,
  Grid
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { GlobalContext } from "../GlobalState";
import suggestSearch from "../../apis/suggestSearch";
import AutoSearchResult from "./AutoSearchResult";
import youtubeSearch from "../../apis/youtubeSearch";

const SearchBox = ({ history, location }) => {
  let params = new URLSearchParams(location.search);

  const [{ searchState }, dispatch] = useContext(GlobalContext);

  const setSearchState = useCallback(
    data => {
      dispatch({ type: "setSearchState", snippet: data });
    },
    [dispatch]
  );

  const setSearchResult = useCallback(
    data => {
      console.log(data);
      dispatch({ type: "setSearchResult", snippet: data });
    },
    [dispatch]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [autoSearchData, setAutoSearch] = useState("");

  const [ytSearchQuery, setYtSearchQuery] = useState(null);

  // toggle popper
  const [isPopperOpen, setPopper] = useState(true);

  console.log("search box re rendered");

  // get back the selected search data
  const onSearchSelect = result => {
    setSearchQuery(result);
    setYtSearchQuery(result);
    setSearchState("searching");
    history.push({ pathname: "/search", search: `?q=${result}` });
  };

  // when user hits enter then also fetch the data from yt api
  const onSearchSubmit = e => {
    e.preventDefault();
    console.log(e.target.lastChild);
    e.target.lastChild.lastChild.blur();
    setSearchState("searching");
    setYtSearchQuery(searchQuery);
    history.push({ pathname: "/search", search: `?q=${searchQuery}` });
  };

  // for controlled input change
  const onChange = e => {
    setSearchQuery(e.target.value);
    getAutocomplete();
  };

  const processSuggestionResponse = data => {
    let strData = data.split("window.google.ac.h(")[1].slice(0, -1)
    return JSON.parse(strData)[1];
  }
  
  // get autocomplete data form api
  const getAutocomplete = async () => {
    const response = await suggestSearch.get("", {
      params: {
        q: searchQuery
      }
    });
    setAutoSearch(processSuggestionResponse(response.data));
  };

  // get youtube search result from api
  useEffect(() => {
    const searchYt = async data => {
      const res = await youtubeSearch.get("/search", {
        params: {
          q: data,
          maxResults: 15
        }
      });
      setSearchResult(res.data.items);
      setSearchState("completed");
    };
    // only search if there is any value
    if (ytSearchQuery && ytSearchQuery !== "") {
      searchYt(ytSearchQuery);
    }
    // console.log(ytSearchQuery);
  }, [ytSearchQuery, setSearchResult, setSearchState]);

  useEffect(() => {
    console.log("search state", searchState);
  }, [searchState]);

  useEffect(() => {
    // Listen for changes to the current location.
    const query = params.get("q");
    if (query) {
      setYtSearchQuery(query);
      setSearchQuery(query);
      setSearchState("searching");
      console.log("changing query to", query);
    }

    // const unlisten = history.listen(location => {
    //   // setYtSearchQuery(params.get("q"));
    //   // we will se the q from params
    //   // location is an object like window.location
    //   const path = location.pathname;
    //   // if (path.slice(1, 7) === "search" || path.slice(1, 5) === "song") {
    //   //   setSearchState("searched");
    //   // } else {
    //   //   setSearchState("home");
    //   // }
    // });
  }, [setSearchState, setYtSearchQuery]);

  // show loading icon while we fetch the results from api

  const popperResult = () => {
    switch (searchState) {
      case "searching":
        return (
          <Grid
            style={{ height: "100vh" }}
            container
            justify="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        );
      case "clicked":
        return (
          <AutoSearchResult
            results={autoSearchData}
            onSearchSelect={onSearchSelect}
          />
        );
      case "completed":
        setPopper(false);
        break;
      default:
        break;
    }
    console.log("Function ran");
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setSearchState("home");
          if (history.location.pathname === "/search") {
            history.goBack();
          }
          // only go back if u have searched something
        }}
        color="inherit"
        aria-label="Menu"
      >
        <ArrowBack />
      </IconButton>
      <form style={{ width: "100%" }} onSubmit={e => onSearchSubmit(e)}>
        <InputBase
          fullWidth
          placeholder="Search..."
          autoFocus
          style={{ color: "#fff", paddingLeft: "16px" }}
          value={searchQuery}
          onChange={onChange}
          // on click we will show popper
          onClick={() => {
            setSearchState("clicked");
            setPopper(true);
          }}
        />
      </form>

      <Popper
        className="searchPopper"
        open={isPopperOpen}
        anchorEl={document.getElementById("navbar")}
        popperOptions={{
          modifiers: {
            preventOverflow: {
              padding: 0
            }
          }
        }}
        placement="bottom"
      >
        {popperResult}
      </Popper>
    </>
  );
};

export default withRouter(SearchBox);
