//my api key: 7c06a81095931482369301ba336a0e52

//call 5 day/3 hour forecast data:
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7c06a81095931482369301ba336a0e52}

//geocoding api:
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={7c06a81095931482369301ba336a0e52}

var requestURL =
  "http:api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={7c06a81095931482369301ba336a0e52}";
console.log(requestURL);
// var cityName =
// var stateCode =
// var countryCode =
//in URL, replace {city name} with ${cityName}?
var fetchButton = document.getElementById("fetch-button");

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    console.log(data);
    var lat = data.lat
    var lon = data.lon
    return (lat, lon)
  })

  .then(function (coords) {
    fetch("https://")
    .then(function(resp){
        return resp.json()
    })
    .then(function(finalData){
        //final data can be parsed here
    })
})
 

  for (var i = 0; < data.length; i++) {
    //creating elmeents, table row, table data, anchor
    var createTableRow = document.createdElement("tr");
    var tableData = document.createElement("td");
    var link = document.createElement("a");

    //setting text of link and the href of the link
    link.textContent = data[i].html_url;
    link.href = data[i].html_url;

    //appending the link to the table data and 
    //then appending the table data to the table row
    //the table row then gets appended to the table body
    tableData.appendChild(link);
    createTableRow.appendChild(tableData);
    tableBody.appendChild(createTableRow);
  }
  .catch(function(err){
    console.log(err)
    document.querySelector("footer").innerHTML = <p>"There was an error"</p>

});

fetchButton.addEventListener("click", getAPI);
