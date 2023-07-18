//my api key: 7c06a81095931482369301ba336a0e52

//call 5 day/3 hour forecast data:
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7c06a81095931482369301ba336a0e52}

//geocoding api:
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={7c06a81095931482369301ba336a0e52}

var APIKey = "7c06a81095931482369301ba336a0e52";

var searchFormEl = document.querySelector("#search-form");

var allCitiesSearched = [];
var cityListEl = document.getElementById("city-list");

// Read from storage, populate global variables w/ state, and update UI
function getCities() {
  allCitiesSearched = JSON.parse(localStorage.getItem("allCities")) || [];
  console.log(allCitiesSearched);
  displayCities();
}

// When state changes because a new city has been requested, update storage and UI
function addNewCity(city) {
  allCitiesSearched.push(city);
  localStorage.setItem("allCities", JSON.stringify(allCitiesSearched));

  displayCities();
}

// Update UI with state
function displayCities() {
  cityListEl.innerHTML = "";
  // rebuild the display of all city names
  allCitiesSearched.forEach(function (city) {
    var liTag = document.createElement("button");
    liTag.type = "button";
    liTag.textContent = city;
    cityListEl.appendChild(liTag);
    //how to make this a button?

    // add event listener to button
    liTag.addEventListener("click", function () {
      var cityName = this.textContent;
      handleCityButtonClick(cityName);
    });
  });
}

function handleCityButtonClick(cityName) {
  // preform search based on city name
  var requestURL = `http:api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=7c06a81095931482369301ba336a0e52`;
  var today = dayjs();
  var date = document.getElementById("currentDay");
  date.textContent = "Current weather in " + cityName + " on " + today + ":";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });
  console.log("Search query", cityName);
}

/*
    When the app loads:
      - check local storage to get all previous cities; make that list a global variable

    When a new city is defined:
      - add that city to the global variable 
      - update local storage because list of cities has changed
*/
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  addNewCity(searchInputVal);
  console.log(searchInputVal);

  var requestURL = `http:api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&limit=1&appid=7c06a81095931482369301ba336a0e52`;
  //console.log(requestURL);

  if (searchInputVal === cityListEl) {
    //don't add to the list--how?
  }

  // display in mm/dd/yy
  var today = dayjs().format("MM/DD/YY");
  var date = document.getElementById("currentDay");
  date.textContent =
    "The weather today in " + searchInputVal + " on " + today + ":";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      // console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      //console.log(lat, lon);

      getWeather(lat, lon);
    });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function getWeather(lat, lon) {
  //console.log("lat", lat, "lon", lon);
  requestURL = `http:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=7c06a81095931482369301ba336a0e52`;
  //console.log(requestURL);

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      //console.log(data);
      var temp = data.list[0].main.temp;
      var wind = data.list[0].wind.speed;
      var humidity = data.list[0].main.humidity;
      var icon = data.list[0].weather[0].icon;
      console.log(temp);
      console.log(wind);
      console.log(humidity);
      console.log(icon);

      //how to add "units=imperial" to temp?

      var iconDisplay = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(iconDisplay);
      //how to get icon to display?

      const newForecastArr = [];
      var forecast = document.getElementById("fiveDay");
      // clear previous forcast
      // forecast.innerHTML = "";

      // iterate over the 40 blocks, do them 8 at a time, so that we get one per day.
      for (let i = 0; i < 40; i = i + 8) {
        //newForecastArr.push(data.list[i]);

        //create elements in for loop
        console.log(data.list[i].main.temp);
        var temp5 = document.createElement("h3");
        temp5.textContent = "Temperature: " + data.list[i].main.temp + " F";
        forecast.append(temp5);

        console.log(data.list[i].wind.speed);
        var wind5 = document.createElement("h3");
        wind5.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        forecast.append(wind5);

        console.log(data.list[i].main.humidity);
        var humidity5 = document.createElement("h3");
        humidity5.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        forecast.append(humidity5);

        console.log(data.list[i].weather[0].icon);
        var icon5 = document.createElement("img");
        icon5.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        forecast.append(icon5);
      }
      //console.log(newForecastArr);

      newForecastArr.innerHTML = "";

      var tempEl = document.getElementById("temp");
      tempEl.textContent = "Temperature: " + temp + " F";

      var windEl = document.getElementById("wind");
      windEl.textContent = "Wind: " + wind + " MPH";

      var humidityEl = document.getElementById("humidity");
      humidityEl.textContent = "Humidity: " + humidity + "%";

      var iconEl = document.getElementById("icon");
      iconEl.textContent = icon;

      newForecastArr.forEach(function (temp) {});
    });
}

/*Instructor notes:
  I am loading the sample data via another script tag on the index.html page, so I have that data 
  available here as a global variable. It was named sample in the other file so we'll use that here.
*/

// This is the array of hour blocks: 8 per day, for a total of 40.
//const daysInForecast = sample.list;

/*
Each date object has a property called "dt", which is a Unix timestamp for the date and time 
of that object's data. The first one is 1681333200.
*/

// Create a new array to hold one day block per forecast day.

// We now have a new array with one record for each day!

getCities();
