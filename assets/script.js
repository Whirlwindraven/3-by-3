//set necessary variables
//text from search bar
var search = document.getElementById("search");
var searchBtn = document.getElementById("searchBtn");


//set call Wikipedia function
function callWikipediaAPI() {
    var wURL = "https://en.wikipedia.org/w/api.php";
    var wParams = {
        action: "opensearch", //tell the API what action to perform
        search: "Computer Programming", //search topic, pull from search bar
        limit: "5", //limit of results to fetch
        namespace: "0", //don't know, but it's the default value
        format: "json" //format to provide the data in
    };
    //constructs a new URL for the API to use based on the parameters
    wURL = wURL + "?origin=*";
    Object.keys(wParams).forEach(function(key){wURL += "&" + key + "=" + wParams[key];}); 
    //fetch page results
    fetch(wURL)
        .then(function(response) {return response.json();})
        .then(function(data) {
            console.log(data);
            for (i=0; i<data[1].length; i++) {
                var articleName = data[1][i];
                function fetchDescription() {
                    //fetch description from a given page
                    fetch("https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + articleName + "&prop=text&section=0&utf8=1&origin=*")
                        .then(function(response) {return response.json();})
                        .then(function(data) {
                        console.log(data);
                        if (data.error) return;
                        //if the article doesn't redirect, pull it
                        if (!data.parse.text["*"].includes("redirectMsg")) {
                            console.log(data.parse.text["*"].substring(data.parse.text["*"].indexOf("display")+14, data.parse.text["*"].indexOf("</div>")));
                        }
                        //else, find the redirect article and pull that instead
                        else {
                            return;
                            //old code to handle redirects, ignore for now
                            //console.log("Article '" + articleName + "' redirects");
                            //articleName = data.parse.text["*"].substring(data.parse.text["*"].indexOf("title="+7, data.parse.text["*"].indexOf(">", data.parse.text["*"].indexOf("title="))));
                            //fetchDescription();
                        }
                    })
                }
                fetchDescription();
            }
        })
        .catch(function(error) {console.log(error);})
}

//set call YouTube function
function callYouTubeAPI() {
    // var videoId = "";
    // var yInfoURL = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=AIzaSyCS2ZElMlvF3ZCgpzJ5hljHUNlDdcXlB94&part=snippet,statistics&fields=items(id,snippet,statistics)";
    // var ySearchURL = "https://www.googleapis.com/youtube/v3/search&part=snippet&type=video&videoEmbeddable=true"

const APIKEY = "&key=AIzaSyCS2ZElMlvF3ZCgpzJ5hljHUNlDdcXlB94"  //API key
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&q='; //search API for Youtube

let searchYouTube = youtubeAPI + search.value + APIKEY
console.log(searchYouTube);


}


 
//set function for pressing search button
function searchTopic() {

}

searchBtn.addEventListener("click", function(){
    callWikipediaAPI();
    callYouTubeAPI();
});

//current API to text, put the function here
//callWikipediaAPI();
