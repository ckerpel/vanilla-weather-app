//A. CURRENT TIME
//A.00 Finding the Day
function formatDate(timestamp){
//A.00.01 Get Now  
  let date = new Date(timestamp);
//A.00.02 Formating Day's Name's
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let today = days[date.getDay()];
  return `${today}`
}
//A.01 Finding the Hour:Minutes
function formatHours(timestamp){
  //A.01.01 Get Now  
  let date = new Date(timestamp);
  //A.01.02 Getting only Hour
  let hours = date.getHours()
  //A.01.02.01 Adding zeros to hours less than 10
  if(hours < 10){
  hour = `0${hours}`;
  }
  //A.01.03 Getting only Hour
  let minutes =  date.getMinutes();
  //A.01.03.01 Adding zeros to minutes less than 10
  if (minutes <10){
  minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
//A.02 Finding the Month+Day+Year
  function formatFullDate(timestamp){
    //A.00.01 Get Now  
    let date = new Date(timestamp);
    //A.00.02 Getting Month and Formating Month's Name
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
    let currentMonth = months[date.getMonth()];
    //A.00.03 Getting Day, Year and Output MMMM DD, YYYY
    let currentDay = date.getDate();
    let currentYear = date.getFullYear();
    return `${currentMonth} ${currentDay}, ${currentYear}`;
  }
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
  //axios.get(apiUrl).then(displayForecast);
}

//C.01 Updating HTML
function displayTemperature(response) {
  //C.01.01 Defining the place of info inside HTML
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#where");
  let countryElement = document.querySelector("#country");
  let nowDayElement = document.querySelector("#day-hour");
  let nowMonthElement = document.querySelector("#month-day");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  //C.01.02 Updating the HTML if live data
  celTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  nowDayElement.innerHTML = formatDate(response.data.dt * 1000) + " ,"+ formatHours(response.data.dt * 1000);
  nowMonthElement.innerHTML = formatFullDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //let latForecast = response.data.coord.lat;
  //let lonForecast = response.data.coord.lon;
  //let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  //let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latForecast}&lon=${lonForecast}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrlForecast).then(displayForecast);
}

//C.04 Up Forecast
//function getToday(timestamp){
//  let hoje = new Date();
//  today = days[hoje.getDay()];
 

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
