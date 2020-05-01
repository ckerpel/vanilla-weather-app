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

//B.01 DEFINING LOCATIONS
//B.00 Predefined location
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
//B.02 Getting info entered by user
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

  //apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(dispalyForecast);
}


function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#where");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let precipitationElement = document.querySelector("#precipitation");
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
}

function displayFahTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celLink.classList.remove("active");
  fahLink.classList.add("active");
  let fahTemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahTemperature);
}

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
