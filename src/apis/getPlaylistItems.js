import axios from "axios";
import { selectRandomKey } from "./youtubeSearch";

// your api key in the env file here, see youtubeSearch.js
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: "15",
    key: selectRandomKey()
  }
});
