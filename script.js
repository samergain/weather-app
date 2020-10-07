
var savedCities = [];
var key = "citiesList";
var currentDT = moment().format();
var currentDate = currentDT.split("T")[0];
renderHistory();
//Current weather in selected city 
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
        $("#windSpeed").html("Wind Speed: " + response.wind.speed);
        var latitude = response.coord.lat;
        var longtitude = response.coord.lon;
        uvIndex(latitude, longtitude);
    });
}
//Current UV Index in selected city
function uvIndex(lat,lon) {
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0ee12c32cce8e87dbfe9e6d43d3583a0";
    $.ajax({
        url: uvURL,
        method: "GET"
         })
        .then(function(response) {
            var uvI = response.value;
            $("#uv").html("UV Index: " + "<span>" + uvI + "</span>");
            if ( uvI > 7) {
                $("span").css("background-color","red");
            } else if ( uvI > 5 && uvI < 8) {
                $("span").css("background-color","orange");
            } else if ( uvI > 2 && uvI < 6) {
                $("span").css("background-color","yellow");
            } else if ( uvI < 3) {
                $("span").css("background-color","green");
            }
        });
}

// 5 days forecast
function forecast(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +cityName + ",us&units=imperial&appid=0ee12c32cce8e87dbfe9e6d43d3583a0";
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) { 
        var forecastList = response.list;
        var forecastDiv = $("#five-days");
        forecastDiv.empty();
        //loop over the list starting with item 7 (to insure starting with tomorrow)
        //then jump 8 items (8*3=24 hours) to the next day
        for (var i=5; i < forecastList.length; i+=8) {
            var cardDiv = $("<div>").attr("class","col bg-light mr-2");
            var elemDate = forecastList[i].dt_txt;
            var splitDate = elemDate.split(" ")[0];
            var cardDate = $("<h6>").attr("class","mt-2").text(splitDate);
            var iconURL = "http://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + "@2x.png";
            var cardIcon = $("<img>").attr("src", iconURL);
                cardIcon.attr("alt", "weather icon");
            var cardTemp = $("<p>").text("Temp(F): " + forecastList[i].main.temp);
            var cardHumidity = $("<p>").text("Humidity: " + forecastList[i].main.humidity);
            cardDiv.append(cardDate, cardIcon, cardTemp, cardHumidity);
            forecastDiv.append(cardDiv);
        }
    
    });
}


$("#search-btn").on("click", function(){
    event.preventDefault();
    var searchInput = $("#search-text").val().trim();
    if (searchInput !== ""){
        savedCities.unshift(searchInput);
        localStorage.setItem(key, JSON.stringify(savedCities));
        var cityListItem = $("<li>").attr("class","list-group-item").text($("#search-text").val());
        $("#searchHistory").prepend(cityListItem);
        currentWeather(searchInput);
        forecast(searchInput);
    } else {
        return;
    }
});

$("li").on("click", function() {
    event.preventDefault();
    var liTxt = $(this).text();
    currentWeather(liTxt);
    forecast(liTxt);
});

function renderHistory() {   
    if(localStorage.length){
    savedCities = JSON.parse(localStorage.getItem(key));
        for(var i=0; i < savedCities.length; i++){
            var cityListItem = $("<li>").attr("class","list-group-item").text(savedCities[i]);
            $("#searchHistory").append(cityListItem);
        }
        currentWeather(savedCities[0]);
        forecast(savedCities[0]);
    }
}
