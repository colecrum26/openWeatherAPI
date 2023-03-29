const apiKey = "5bfff3ebda0e0482eab8cdd3efecce1a";
// TODO
// Eventually this will be replaced with an element.value in an Input tag
// city/state will eventually be replaced
const cityId = document.getElementById("cityId");
const stateId = document.getElementById("stateId");
const countryId = document.getElementById("countryId");

let cityName = cityId.value;
let state = stateId.value;
let countryCode = countryId.value;
const limit = "5";
// let lat = "";
// let lon = "";
let currentWeatherURL = "";
let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`;

async function getCityWeather(){
    let res = await fetch(geoUrl);
    let data = await res.json();
    let dataObj = data[0];
    console.log("made it this far");
    let lat = dataObj.lat;
    let lon = dataObj.lon;
    let city = dataObj.name;
    let st = dataObj.state;
    let country = dataObj.country;
    currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    // console.log(currentWeatherURL);
    console.log(city, lat, lon, st, country);
    getCurrentWeather();
    let cityEl = document.getElementById("city-name");
    cityEl.textContent = city;
    let stateEl = document.getElementById("state-name");
    stateEl.textContent = st;
    let countryEl = document.getElementById("country-name");
    countryEl.textContent = country;
};


async function getCurrentWeather(){
    let res = await fetch(currentWeatherURL);
    let data = await res.json();
    let dataObj = data;
    console.log(currentWeatherURL);
    console.log(dataObj);
    let day1Icon = dataObj.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`;
    let day1IconId = document.getElementById("day1Icon");
    day1IconId.src = iconURL;
};

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    getCityWeather();
})