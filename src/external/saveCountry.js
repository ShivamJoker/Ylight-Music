const country_code = localStorage.getItem("country_code");

const GeoAPI = "https://freegeoip.app/json/";

const fetchCountry = async () => {
  const data = await (await fetch(GeoAPI, { mode: "no-cors" })).json();

  //   set the current country code in local stoarge
  localStorage.setItem("country_code", data.country_code);
};

if (!country_code) {
  // if country is not set then only set it
  fetchCountry();
}
