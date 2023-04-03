const apiKey = "5bfff3ebda0e0482eab8cdd3efecce1a";
let tempLoc

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
  let tempURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  getCurrentWeather(tempURL);
  let cityEl = document.getElementById("city-name");
  cityEl.textContent = city;
  let stateEl = document.getElementById("state-name");
  stateEl.textContent = st;
  let countryEl = document.getElementById("country-name");
  countryEl.textContent = country;
  tempLoc = new SelectedLocation(city, country, lat, lon);
}

async function getCurrentWeather(currentWeatherURL) {
  let res = await fetch(currentWeatherURL);
  let dataW = await res.json();
  console.log(dataW)
  let tempK = dataW.main.temp;
  let tempF = ((tempK-273.15)*(9/5)+32).toFixed(0) + "\u00B0F";
  console.log(currentWeatherURL);
  let day1Icon = dataW.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`;
  let day1IconId = document.getElementById("day1Icon");
  day1IconId.src = iconURL;
  let tempEl = document.getElementById("city-temps");
  tempEl.textContent = tempF;
  tempLoc.temps = tempF;
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

class SelectedLocation {
  constructor(city, country, lat, lon){
    this.city = city;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
  };
};

const body = document.getElementById("body");
const save = document.getElementById("save");
const favs = document.getElementById("favs");

save.addEventListener("click", () => {
  const saved = document.createElement("li");
  const refresh = document.createElement("button");
  const remove = document.createElement("button");
  refresh.textContent = "Refresh Weather";
  remove.textContent = "Remove Location";
  let savedLoc = tempLoc;
  let date = new Date();
  let stamp = document.createElement("li");
  refresh.addEventListener("click", () => {
    let refreshURL = `https://api.openweathermap.org/data/2.5/weather?lat=${savedLoc.lat}&lon=${savedLoc.lon}&appid=${apiKey}`;
    getCurrentWeather(refreshURL);
  });
  remove.addEventListener("click", () => {
    favs.removeChild(saved);
  })
  saved.textContent = `${savedLoc.city}, ${savedLoc.country} ${savedLoc.temps}`;
  favs.appendChild(saved);
  favs.appendChild(refresh);
  favs.appendChild(remove);
});

// Eventual TODOs - choice of F, C, K temp units
