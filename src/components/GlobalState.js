import React, {useState} from 'react'

export const SearchBoxContext = React.createContext()

export const GlobalState = props => {
const [isSearchOpen, setSearch] = useState(false);
const [searchQuery, setSearchQuery] = useState(null);

  return (
    <SearchBoxContext.Provider
      value={{isSearchOpen, setSearch}}
    >
      {props.children}
    </SearchBoxContext.Provider>
  )
}

