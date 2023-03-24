// TODO
// Eventually this will be replaced with an element.value in an Input tag
const apiKey = "5bfff3ebda0e0482eab8cdd3efecce1a";
// TODO
// city/state will eventually be replaced
const cityName = "new+orleans";
const state = "LA";
const countryCode = "US";
const limit = "5";
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`;

async function getCityWeather(){
    let res = await fetch(geoUrl);
    let data = await res.json();
    let dataObj = data[0];
    let lat = dataObj.lat;
    let lon = dataObj.lon;
    let city = dataObj.name;
    let st = dataObj.state;
    let country = dataObj.country
    console.log(city, lat, lon, st, country);
};
getCityWeather();