import axios from "axios";

const country_code = localStorage.getItem("country_code");

// const key = "02924c9a5a777f4d4854a45a326432c6";
const proxy = `https://cors.bridged.cc`;
const GeoAPI = "https://ipapi.co/json/";

const fetchCountry = async () => {
  const res = await (await fetch(`${proxy}/${GeoAPI}`, { 
    method: "GET"
  })).json(); // mode: "no-cors" don't return anything even if successfull
  //   set the current country code in local stoarge
  localStorage.setItem("country_code", res.country);
};

if (!country_code) {
  // if country is not set then only set it
  fetchCountry();
}
