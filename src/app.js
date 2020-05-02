//A. LEFT SIDE: CURRENT TIME
//A.00 Declaring General Variables needed
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = days[now.getDay()];
let hour = now.getHours()
if(hour < 10){
  hour = `0${hour}`;
}
let minutes =  now.getMinutes();
if (minutes <10){
  minutes = `0${minutes}`;
} 
let currentTime = hour + ":" + minutes;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentMonth = months[now.getMonth()];
let currentDay = now.getDate();
let currentYear = now.getFullYear();

//A.01 Defining specific output: DAY NAME + HOUR (Improvements required: Add zero. )
let nowDay = document.querySelector("#day-hour");
  nowDay.innerHTML = today + ", " + currentTime;

//A.02 Defining specific output: DATE  
let nowMonth = document.querySelector("#month-day");
  nowMonth.innerHTML = currentMonth + " " + currentDay + ", " +  currentYear;

//B DEFINING LOCATION
//B.00 Predefined location and run General function (b.99)
search("Rio de Janeiro");

//B.01 Getting Current Location info
//B.01.01 Pop Up
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(defineLocation);
}
//B.01.02 Log to open weather map
function defineLocation(position) {
  let apiKey = "500879ecd691e9d1fcc3776605ed01a1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCoord).then(getCityName);
}
//B.01.03 Find de City's Name and run General function (b.99)
function getCityName(response) {
  let city = response.data.name;
  search(city);
}
//B.02 Getting info entered by user and run General function (b.99)
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

//B.99 General Function to call Any City 
function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature); 
}

//C.01 Updating HTML
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#where");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let latForecast = response.data.coord.lat;
  let lonForecast = response.data.coord.lon;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latForecast}&lon=${lonForecast}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

//C.04 Up Forecast
function displayForecast(response) {
  for (let i = 1; i < 7; i ++) {
    let forecast = response.data.daily[i];
    let dayElement = document.querySelector(`#day${i}`);
    let maxElement = document.querySelector(`#max${i}`);
    let minElement = document.querySelector(`#min${i}`);
    let icon = document.querySelector(`#icon${i}`);
    let next_day = formatDay(forecast.dt*1000);
    let comma_index = next_day.indexOf(",");
    
    dayElement.innerHTML = next_day.slice(0,comma_index);
    maxElement.innerHTML = `${Math.round(forecast.temp.max)}°`;
    minElement.innerHTML = `${Math.round(forecast.temp.min)}°`;
    icon.setAttribute('src',`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
    icon.setAttribute('alt',`${forecast.weather[0].description}`);
  }
}

//C.03 Fahrenheit Link
function displayFahTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celLink.classList.remove("active");
  fahLink.classList.add("active");
  let fahTemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahTemperature);
}

//C.04 Celsius Link
function displayCelTemperature(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTemperature);
}

let celTemperature = null;

let cityform = document.querySelector("#search-button");
cityform.addEventListener("click", handleSubmit);

let currentLink = document.querySelector("#search-current");
currentLink.addEventListener("click", getCurrentLocation);

let fahLink = document.querySelector("#fahLink");
fahLink.addEventListener("click", displayFahTemperature);

let celLink = document.querySelector("#celLink");
celLink.addEventListener("click", displayCelTemperature);
