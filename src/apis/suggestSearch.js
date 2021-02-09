export default {
  baseURL: "https://suggestqueries.google.com/complete/search?",
  params: {
    hl: "en", // Language
    ds: "yt", // Restrict lookup to youtube
    client: "youtube" // force youtube style response, i.e. jsonp
  }
};
