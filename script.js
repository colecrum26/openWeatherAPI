const apiKey = "5bfff3ebda0e0482eab8cdd3efecce1a";
// TODO

async function getCityWeather(geoUrl) {
  console.log(geoUrl);
  let res = await fetch(geoUrl);
  let dataG = await res.json();
  console.log(dataG)
  let lat = dataG[0].lat;
  let lon = dataG[0].lon;
  let city = dataG[0].name;
  let st = dataG[0].state;
  let country = dataG[0].country;
  let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  getCurrentWeather(currentWeatherURL);
  let cityEl = document.getElementById("city-name");
  cityEl.textContent = city;
  let stateEl = document.getElementById("state-name");
  stateEl.textContent = st;
  let countryEl = document.getElementById("country-name");
  countryEl.textContent = country;
}

async function getCurrentWeather(currentWeatherURL) {
  let res = await fetch(currentWeatherURL);
  let dataW = await res.json();
  console.log(dataW)
  let temp = dataW.weather[0].description;
  console.log(currentWeatherURL);
  let day1Icon = dataW.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`;
  let day1IconId = document.getElementById("day1Icon");
  day1IconId.src = iconURL;
  let tempEl = document.getElementById("city-temps");
  tempEl.textContent = temp;
}

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityId = document.getElementById("cityId");
  const stateId = document.getElementById("stateId");
  const countryId = document.getElementById("countryId");

  let cityName = cityId.value;
  let state = stateId.value;
  let countryCode = countryId.value;
  const limit = "5";
  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`;
  getCityWeather(geoUrl);
});

// Eventual TODOs - choice of F, C, K temp units