import React, {useContext} from "react";
import LoginPage from './LoginPage'

import { GlobalContext } from "./GlobalState";
import SearchResult from "./SearchResult";


const CurrentSection = () => {
const { searchState } = useContext(GlobalContext);
const { searchResult } = useContext(GlobalContext);
   
       if (searchState === "home") {
           return(
            <LoginPage/>
           )
        } else if(searchState === "completed"){
            return(
                <SearchResult videos={searchResult}/>
            )
        } else{
            return(<div/>)
        }

};

export default CurrentSection