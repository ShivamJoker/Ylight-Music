import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const AutoSearchResult = ({ results, onSearchSelect }) => {
  let renderResult = [];
  if (results) {
    renderResult = results.map((result, index) => {
      return (
        <ListItem key={index} onClick={() => onSearchSelect(result[0])} button>
          <ListItemIcon style={{ paddingLeft: "16px" }}>
            <Search />
          </ListItemIcon>
          <ListItemText primary={result[0]} />
        </ListItem>
      );
    });
  }
  return <List>{renderResult}</List>;
};

export default AutoSearchResult;
