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
//B.00 Predefined location (Rio de Janeiro) and run General function (b.99)
searchByName("Rio de Janeiro");

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
  let cityID = response.data.id;
  searchById(cityID);
}

//B.02 Getting info entered by user and run General function (b.99)
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  searchByName(cityInputElement.value);
}
//B.99.01 General Function to call Any City ID
function searchById(cityID) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature); 
}
//B.99.02 General Function to call Any City Name
function searchByName(cityname) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature); 
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
  //All the items except DDD+HH:MM MMM+DD+YYYY
  celTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celTemperature)}°`;
  cityElement.innerHTML = `${response.data.name}, `;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //Bring Date info based on the browser
  //nowDayElement.innerHTML = formatDate(response.data.dt * 1000) + " ,"+ formatHours(response.data.dt * 1000);
  //nowMonthElement.innerHTML = formatFullDate(response.data.dt * 1000);

  //Bring Date info based on the timezone
  let today = new Date(); 
  let inputCityTimezone = response.data.timezone; 
  let todayCityTimezone = today.setHours(today.getUTCHours() + inputCityTimezone/3600); //returns the miliseconds since January 1, 1970 00:00:00 UTC of the input_city
  nowDayElement.innerHTML = formatDate(todayCityTimezone) + " ,"+ formatHours(todayCityTimezone);
  nowMonthElement.innerHTML = formatFullDate(response.data.dt * 1000);

  let latForecast = response.data.coord.lat;
  let lonForecast = response.data.coord.lon;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latForecast}&lon=${lonForecast}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

//C.04 Up Forecast
//C.04.01 Up Forecast
function displayForecast(response) {
   for (let i = 1; i < 7; i ++) {
      forecast = response.data.daily[i];
      let dayElement = document.querySelector(`#day${i}`);
      let maxElement = document.querySelector(`#max${i}`);
      let minElement = document.querySelector(`#min${i}`);
      let icon = document.querySelector(`#icon${i}`);
      let nextDay = formatDate(forecast.dt*1000);
          
      dayElement.innerHTML = nextDay;
      maxElement.innerHTML = `${Math.round(forecast.temp.max)}° | `;
      minElement.innerHTML = `${Math.round(forecast.temp.min)}°`;
      icon.setAttribute('src',`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
      icon.setAttribute('alt',`${forecast.weather[0].description}`);
  }
}
//C.04.91 Scale Settings
//C.04.91.01 Fahrenheit
function displayFahTemperature(event) {
  event.preventDefault();
  //Changing Scale to main temperature 
  let temperatureElement = document.querySelector("#temperature");
  celLink.classList.remove("active");
  fahLink.classList.add("active");
  let fahTemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahTemperature)}°`;
  //Changing Scale to Forecast Dashboard 
  for (let j = 1; j < 7; j ++) {
    let maxElement = document.querySelector(`#max${j}`);
    maxCelsius = parseInt(maxElement.innerHTML, 10);
    maxElement.innerHTML = `${Math.round((maxCelsius*9 )/5 + 32)}° | `;
    
    let minElement = document.querySelector(`#min${j}`);
    minCelsius = parseInt(minElement.innerHTML, 10);
    minElement.innerHTML = `${Math.round((minCelsius*9 )/5 + 32)}°`;
  } 
  fahLink.removeEventListener('click',displayFahTemperature); 
  celLink.addEventListener("click",displayCelTemperature); 
}
//C.04.91.01 Celsius
function displayCelTemperature(event) {
  event.preventDefault();
  //Changing Scale to main temperature 
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celTemperature)}°`;
  //Changing Scale to Forecast Dashboard 
  for (let j = 1; j < 7; j ++) {
  let maxElement = document.querySelector(`#max${j}`);
  maxFah = parseInt(maxElement.innerHTML, 10);
  maxElement.innerHTML = `${Math.round((maxFah-32)*(5/9))}° | `;

  let minElement = document.querySelector(`#min${j}`);
  minFah = parseInt(minElement.innerHTML,10);
  minElement.innerHTML = `${Math.round((minFah-32)*(5/9))}°`;
  }
  celLink.removeEventListener('click', displayCelTemperature);
  fahLink.addEventListener("click",displayFahTemperature);
}

//X. General Actions to call the functions to update the HTML
//X.01 Let the Link to C scale null by default
let celTemperature = null;

//X.02 Call the function when click in F link
let fahLink = document.querySelector("#fahLink");
fahLink.addEventListener("click", displayFahTemperature);

//X.02 Call the function when click in C link
let celLink = document.querySelector("#celLink");
celLink.addEventListener("click", displayCelTemperature);

//X.03 Call when choose set Current Location
let currentLink = document.querySelector("#search-current");
currentLink.addEventListener("click", getCurrentLocation);

//X.04 Call when enter the city and click on search
let cityform = document.querySelector("#search-button");
cityform.addEventListener("click", handleSubmit);




