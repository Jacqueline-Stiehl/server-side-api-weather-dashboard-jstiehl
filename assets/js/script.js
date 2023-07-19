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
  if (!allCitiesSearched.includes(city)) {
    allCitiesSearched.push(city);
    localStorage.setItem("allCities", JSON.stringify(allCitiesSearched));
  }
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

    // add event listener to button
    liTag.addEventListener("click", function () {
      var cityName = this.textContent;
      handleCityButtonClick(cityName);
    });
  });
}

function handleCityButtonClick(cityName) {
  // perform search based on city name
  var requestURL = `https:api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=imperial&appid=7c06a81095931482369301ba336a0e52`;
  var today = dayjs().format("MMMM DD, YYYY");
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

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  addNewCity(searchInputVal);
  console.log(searchInputVal);

  var requestURL = `http:api.openweathermap.org/geo/1.0/direct?q=${searchInputVal}&units=imperial&appid=7c06a81095931482369301ba336a0e52`;

  // display in MMMM DD, YYYY
  var today = dayjs().format("MMMM DD, YYYY");
  var date = document.getElementById("currentDay");
  date.textContent = "The weather in " + searchInputVal + " on " + today + ":";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;

      getWeather(lat, lon);
    });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function getWeather(lat, lon) {
  requestURL = `http:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=7c06a81095931482369301ba336a0e52`;

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var temp = data.list[0].main.temp;
      var wind = data.list[0].wind.speed;
      var humidity = data.list[0].main.humidity;
      var icon = data.list[0].weather[0].icon;
      console.log(temp);
      console.log(wind);
      console.log(humidity);
      console.log(icon);

      const newForecastArr = [];
      var forecast = document.getElementById("fiveDay");
      // clear previous forecast
      forecast.innerHTML = "";

      // iterate over the 40 blocks, do them 8 at a time, so that we get one per day.
      for (let i = 0; i < 40; i = i + 8) {
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
        icon5.src =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          "@2x.png";
        forecast.append(icon5);
      }

      newForecastArr.innerHTML = "";

      var tempEl = document.getElementById("temp");
      tempEl.textContent = "Temperature: " + temp + " FF";

      var windEl = document.getElementById("wind");
      windEl.textContent = "Wind: " + wind + " MPH";

      var humidityEl = document.getElementById("humidity");
      humidityEl.textContent = "Humidity: " + humidity + "%";

      var iconEl = document.getElementById("icon");
      var imgEl = document.createElement("img");
      imgEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      iconEl.appendChild(imgEl);

      var fiveDayHeader = document.getElementById("five");
      fiveDayHeader.textContent = "Five-Day Forecast";
    });
}

getCities();
