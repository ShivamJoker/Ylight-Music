import axios from "axios";
import jsonpAdapter from "axios-jsonp"

export default axios.create({
  baseURL: "https://suggestqueries.google.com/complete/search?",
  adapter: jsonpAdapter,
  params: {
    hl: "en", // Language
    ds: "yt", // Restrict lookup to youtube
    client: "youtube" // force youtube style response, i.e. jsonp
  }
});
