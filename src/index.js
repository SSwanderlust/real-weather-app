// Date function

function formatDate(date) {
  let dateIndex = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${dateIndex} <br> ${hours}:${minutes} `;
}

// Temperature Fahrenheit

function tempFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(
    "#temperature-value"
  );
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(
    (temperature * 9) / 5 + 32
  );
}
// Temperature Celsius

function tempCelsius(event) {
  event.preventDefault();
  let tempCel = document.querySelector(
    "#temperature-value"
  );
  let nowTemperature = 23;
  tempCel.innerHTML = nowTemperature;
}

// My Location Button Function

function retrievePosition(position) {
  let apiKey = "742a4c8cf67279a2287800566ec1d9aa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

//Search API Call

function searchCity(city) {
  let apiKey = "742a4c8cf67279a2287800566ec1d9aa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

// Display Weather ALL (Search + Current + Default)

function displayWeather(response) {
  document.querySelector(
    "#temperature-value"
  ).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#search-city"
  ).innerHTML = response.data.name;
  document.querySelector("#main").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML =
    response.data.wind.speed;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
}

// Submit Button Function

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(
    "#search-input"
  ).value;
  searchCity(city);
}

// Call Function Current Date

let dateElement = document.querySelector(
  "#current-date"
);
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Call for Functions Temperature Fahrenheit

let tempFah = document.querySelector(
  "#fahrenheit"
);
tempFah.addEventListener("click", tempFahrenheit);

let tempCel = document.querySelector("#celsius");
tempCel.addEventListener("click", tempCelsius);

// Call Function Search

let searchButton = document.querySelector(
  "#search-form"
);
searchButton.addEventListener(
  "submit",
  handleSubmit
);

// Geolocation Function

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(
    retrievePosition
  );
}

// Call Location Function

let currentLocation = document.querySelector(
  "#my-location"
);
currentLocation.addEventListener(
  "click",
  getCurrentPosition
);

searchCity("Paris");
