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
let currentTime = now.getHours() + ":" + now.getMinutes();
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

//B. RIGHT SIDE: LOCATION
//B.01 SHOWS CURRENT LOCATION BY DEFAULT
//B.01.01 Get geolocation info from the browser and Calls the Login to the Open Weahter Map
navigator.geolocation.getCurrentPosition(getCoord);
//B.01.02 Login on Open Weahter Map to get the city's name, countries's name and temperature
function getCoord(position) {
  let apiKey = "500879ecd691e9d1fcc3776605ed01a1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCoord).then(getCity);
  axios.get(apiUrlCoord).then(getTemp);
}
//B.01.03 Get the city's name and country's name and change the inner
function getCity(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#where");
  cityElement.innerHTML = `${city}`;
  let country = response.data.sys.country;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${country}`;
}
//B.02 GET LOCATION FROM SEARCH
//B.02.01 Listen the Click and call the function to capture the city
let cityForm = document.querySelector("#button-addon2");
cityForm.addEventListener("click", enterCity);
//B.02.02 Get the city inner as typed
function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let cityEnter = document.querySelector("#where");
  if(searchInput.value) {
    logCityData.call();
  } else{
    cityEnter.innerHTML = null;
    alert("Please Type a City.")
  }
 }
//B.02.03 Log in on Open Weather Map
function logCityData() {
  let searchInput = document.querySelector("#enter-city");
  let cityData = searchInput.value;
  let apiKey = "500879ecd691e9d1fcc3776605ed01a1";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityData}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCity).then(getCountry);
  axios.get(apiUrlCity).then(getTempEnter);
 }
//B.02.04 Get the country and assume city's name as Opne Weather Datasource
function getCountry(response) {
   document.querySelector("#where").innerHTML = response.data.name;
   let country = response.data.sys.country;
   let countryElement = document.querySelector("#country");
   countryElement.innerHTML = `${country}`;
  }  


//C. MIDDLE: TEMPERATURE WITH LIVE DATA
//C.01 Get the Temperature Current Location 
function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#number");
  tempElement.innerHTML = `${temp}`;
}
//C.02 Get the Temperature Current Location 
function getTempEnter(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#number");
  tempElement.innerHTML = `${temp}`;
}

//C.02 SCALE CHOOSE - Shows Celsius, calls Fahrenheit by click on link and call Celsius by click again
//C.02.01 Shows Celsius by Default, first click to choose Fahrenheit, second click to go back to Celsius ...
let click1 = document.querySelector("#rodape");
click1.addEventListener("click", scale);
//C.02.02 If the ID #fah-link ID doesn't exist when click on link calls celsius function showcel()
//if #fah-link exists when click on link calls fahrenheit function showfar()
//ALERT: The ID changes when call a function. Showfah() changes to #cel-link", ShowCel() changes to #fah-link"
function scale(event) {
  event.preventDefault();
  let scale = document.querySelector("#fah-link");
  if(scale === null) {
    showcel(event);
  } else {
    showfah(event);
  }
}
//C.02.02.01 First click on link during the navigation on the Website: Call the Function to convert to Fahrenheit, 
//because by default it is showing Celsius
function showfah(event) {
  event.preventDefault();
  let changefah = document.querySelector("#number");
  changefah.innerHTML = `${Math.round((parseInt(changefah.innerHTML)*1.8)+32)}`;

  let changelinkF = document.querySelector("#fah-link");
  changelinkF.innerHTML = "Click here if you prefer the temperature in Celsius (°C)";

  document.getElementById("fah-link").id = "cel-link";
 }
//C.02.02.02 Second click on link during the navigation on the Website: Call the Function to convert to Celsius, 
//because the user have already done the first click to display the temperature in showing Fahrenheit
function showcel(event) {
  event.preventDefault();
  let changecel = document.querySelector("#number");
  changecel.innerHTML = `${Math.round((parseInt(changecel.innerHTML)-32)/1.8)}`;

  let changelinkC = document.querySelector("#cel-link");
  changelinkC.innerHTML = `Click here if you prefer the temperature in Fahrenheit (°F)`;

  document.getElementById("cel-link").id = "fah-link";
 }


