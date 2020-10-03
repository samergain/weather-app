renderHistory();
$("#search-btn").on("click", function(){
    var key = "city-" + $("#search-text").val();
    var val = $("#search-text").val();
    localStorage.setItem(key,val);
    var cityListItem = $("<li>").attr("class","list-group-item");
    cityListItem.text($("#search-text").val());
    $("#searchHistory").prepend(cityListItem);
});

function renderHistory() {   
    for(var i=0; i<localStorage.length; i++){
        var keyStorage = localStorage.key(i);
        console.log(localStorage.key(i));
        var cityListItem = $("<li>").attr("class","list-group-item");
        cityListItem.text(localStorage.getItem(keyStorage));
        $("#searchHistory").prepend(cityListItem);
    }
}

