const apiKey = "5bfff3ebda0e0482eab8cdd3efecce1a";
const cityName = "new+orleans";
const state = "LA";
const countryCode = "US";
const limit = "5";
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`;

async function getCityWeather(){
    let res = await fetch(geoUrl);
    let data = await res.json();
    console.log(data);
};
getCityWeather();