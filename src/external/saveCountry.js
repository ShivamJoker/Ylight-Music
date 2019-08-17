import axios from "axios";

const country_code = localStorage.getItem("country_code");

const key = "02924c9a5a777f4d4854a45a326432c6";

const GeoAPI = "https://ipapi.co/json/";

const fetchCountry = async () => {
  const res = await axios.get(GeoAPI, { mode: "no-cors" });
  //   set the current country code in local stoarge
  localStorage.setItem("country_code", res.data.country);
};

if (!country_code) {
  // if country is not set then only set it
  fetchCountry();
}
