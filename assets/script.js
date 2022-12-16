//set necessary variables
//text from search bar

//set call Wikipedia function
function callWikipediaAPI() {
    var wURL = "https://en.wikipedia.org/w/api.php";
    var wParams = {
        action: "opensearch", //tell the API what action to perform
        search: "Computer Programming", //search topic, pull from search bar
        limit: "1", //limit of results to fetch
        namespace: "0", //don't know, but it's the default value
        format: "json" //format to provide the data in
    };
    //constructs a new URL for the API to use based on the parameters
    wURL = wURL + "?origin=*";
    Object.keys(wParams).forEach(function(key){wURL += "&" + key + "=" + wParams[key];}); 
    //fetch data
    fetch(wURL)
        .then(function(response){return response.json();})
        .then(function(response) {console.log(response);})
        .catch(function(error){console.log(error);});
}

//set call YouTube function
function callYouTubeAPI() {

}

//set function for pressing search button
function searchTopic() {

}

//current API to text, put the function here
callWikipediaAPI();