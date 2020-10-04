renderHistory();

// current weather by city name: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://openweathermap.org/current
// calculate UV index: https://www.epa.gov/sunsafety/calculating-uv-index-0
var currentDT = moment().format();
var currentDate = currentDT.split("T")[0];
function currentWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName + ",us&units=imperial&appid=0ee12c32cce8e87dbfe9e6d43d3583a0";
$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        var weatherIconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $("#cityName").html(response.name + " (" + currentDate + ")" + "<img src='" + weatherIconURL + "' alt='current weather'>");
        $("#temp").text("Temprature: " + response.main.temp + " F");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#windSpeed").text("Wind Speed: " + response.wind.speed);
        
      // Log the resulting object
      console.log(response);
    });
}
function forecast(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityName + ",us&units=imperial&appid=0ee12c32cce8e87dbfe9e6d43d3583a0";
$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
       // var weatherIconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      // Log the resulting object
      console.log(response);
    });
}
$("#search-btn").on("click", function(){
    event.preventDefault();
    var searchInput = $("#search-text").val();
    localStorage.setItem("city-" + searchInput,searchInput);
    var cityListItem = $("<li>").attr("class","list-group-item").text($("#search-text").val());
    $("#searchHistory").prepend(cityListItem);
    currentWeather(searchInput);
    forecast(searchInput);
});

$("li").on("click", function() {
    var liTxt = $(this).text();
    currentWeather(liTxt);
    forecast(liTxt);
});

function renderHistory() {   
    for(var i=0; i<localStorage.length; i++){
        var keyStorage = localStorage.key(i);
        var cityListItem = $("<li>").attr("class","list-group-item").text(localStorage.getItem(keyStorage));
        $("#searchHistory").prepend(cityListItem);
    }
}

// icon url: http://openweathermap.org/img/wn/10d@2x.png   where 10d is icon code

//******** */
// 5 day/3 hour forecast api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// https://openweathermap.org/forecast5
