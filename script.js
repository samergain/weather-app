$("#search-btn").on("click", function(){
    var key = "city-" + $("#search-text").val();
    var val = $("#search-text").val();
    localStorage.setItem(key,val);
    var cityListItem = $("<li>").attr("class","list-group-item");
    cityListItem.text($("#search-text").val());
    $("#searchHistory").prepend(cityListItem);
});
