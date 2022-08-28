// Format Date function

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

// Format Weekday Function

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

// Weekday Forecast Display function

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement =
    document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col col-3 days">
              <div class="card daysForecast">
                <div class="card-body">
                  <div class="weekday">${formatWeekDay(
                    forecastDay.dt
                  )}</div>
                  <div class="temperatureWeekday">
                    <span class="weatherTemperatureMax">${Math.round(
                      forecastDay.temp.max
                    )}</span>° <span class="weatherTemperatureMin">${Math.round(
          forecastDay.temp.min
        )}</span>°
                  </div>
                  <img
   src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png"
                  alt=""
                  width="42"
                    />
                  </div>
                </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Retrieve My Location Button Function

function retrievePosition(position) {
  let apiKey = "742a4c8cf67279a2287800566ec1d9aa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

// Search City API Call Function Main

function searchCity(city) {
  let apiKey = "742a4c8cf67279a2287800566ec1d9aa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

// Search City API Call Function Daily

function getForecast(coordinates) {
  let apiKey = "742a4c8cf67279a2287800566ec1d9aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Display Weather Main

function displayWeather(response) {
  document.querySelector(
    "#temperature-value"
  ).innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector(
    "#search-city"
  ).innerHTML = response.data.name;
  document.querySelector("#main").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML =
    response.data.wind.speed;
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;
  let iconElement =
    document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  getForecast(response.data.coord);
}

let celsiusTemperature = null;

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
