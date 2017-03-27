//"https://en.wikipedia.org/w/api.php"
var searchValue;

var wikipediaSearchUrlBase = "//en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=";

$(document).ready(function(){
    console.log("loaded JS");
    searchBoxFunction();


});

function searchBoxFunction(){
    $("#searchBox").on('keyup', function (e) {
        if (e.keyCode == 13) {
            // Do something
            searchValue = this.value;
            console.log(searchValue);
            console.log("Enter Detected");

            searchWikipedia(searchValue);
            
        }
    });
}

function searchWikipedia(searchValue){
    var wikipediaSearchUrl = wikipediaSearchUrlBase.concat(searchValue);
    console.log("Search URL: "+ wikipediaSearchUrl);

    $.getJSON(wikipediaSearchUrl, function(returnValue){
        console.log(returnValue);
        var searchResultHTMLItems = displayWikipediaSearchResults(returnValue);
        console.log(searchResultHTMLItems);
        $(".searchResults").html( searchResultHTMLItems );
        
    

    });
}

function displayWikipediaSearchResults(searchResults){
    var searchResultHTML = "";
    console.log(searchResults);
    for (var i = 0; i < searchResults[0].length; i++ ){
        searchResultHTMLItem = '<div class="searchResultItem img-thumbnail">'+
            '<div class="searchResultItemHeader">' + searchResults[0] +'</div>' +
            '<div class="searchResultItemText">' + searchResults[1] +'</div>' +
        '</div>'

        console.log(searchResultHTMLItem)

        searchResultHTML.concat(searchResultHTMLItem);
    }
    console.log(searchResultHTML);
    $(".searchResults").html(searchResultHTML);
    //return searchResultHTML;

}