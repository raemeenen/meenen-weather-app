function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "3fd0b2514fdddeb5a1773faa623df844";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition) 
}

function formatDay(){ 
  let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
  ];
  let day = days[currentDate.getDay()];
  return `${day}`
}

function formatTime (){
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes<10) {minutes = `0${minutes}`};
  return `${hours}:${minutes}`
}

  let currentDate = new Date();
  let weekday = document.querySelector("#current-day");
  weekday.innerHTML = formatDay(currentDate)
  let time = document.querySelector("#current-time");
  time.innerHTML = formatTime(currentDate);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${temperature}°`;
  let humidity = (response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `${wind}mph`;
  let heading = document.querySelector("#current-city");
  let location = response.data.name;
  heading.innerHTML = `${location}`;
}

function changeCity(event){
  event.preventDefault();
  let city = document.querySelector("#change-city-input");
  let heading = document.querySelector("#current-city")
  heading.innerHTML = (`${city.value}`);
  let apiKey = "3fd0b2514fdddeb5a1773faa623df844";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function changeToCelsius(event){
  let toCelsius = document.querySelector("#current-temp-number");
  toCelsius.innerHTML = ("29°");
}

function changeToFahrenheit(event){
  let toFahrenheit = document.querySelector("#current-temp-number");
  toFahrenheit.innerHTML = ("84°");
}

navigator.geolocation.getCurrentPosition(showPosition);

let enterCity = document.querySelector("#change-city");
enterCity.addEventListener("submit", changeCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit)

