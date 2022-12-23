//set necessary variables
//text from search bar
var search = document.getElementById("search");
var searchBtn = document.getElementById("searchBtn");
var searchTerms = search.value.replace(/\s/g, '+');
//define wikipedia title and text
var wikiTitle = document.getElementById("wikipediaTitle");
var wikiText = document.getElementById("wikipediaText");
//define youtube title and text
var ytubeTitle = document.getElementById("youtubeTitle");
var ytubeText = document.getElementById("youtubeText");




//set call Wikipedia function
function callWikipediaAPI() {
    var searchTerms = search.value.replace(/\s/g, '+');
    var wURL = "https://en.wikipedia.org/w/api.php";
    var wParams = {
        action: "opensearch", //tell the API what action to perform
        search: searchTerms, //search topic, pull from search bar
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
                wikipediaTitle.textContent = articleName;
                function fetchDescription() {
                    //fetch description from a given page
                    fetch("https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + articleName + "&prop=text&section=0&utf8=1&origin=*")
                        .then(function(response) {return response.json();})
                        .then(function(data) {
                        console.log(data);
                        if (data.error) return;
                        //if the article doesn't redirect, pull it
                        if (!data.parse.text["*"].includes("redirectMsg")) {
                            var articleDesc = data.parse.text["*"].substring(data.parse.text["*"].indexOf("display")+14, data.parse.text["*"].indexOf("</div>"));
                            wikipediaText.textContent = articleDesc;
                            console.log(articleDesc);
                            //define wikipedia element section
                            var wikipediaSection = document.getElementById("wikipedia");
                            //create a header element
                            var wikipediaTitle = document.createElement("h2");
                            //fill header element with text
                            wikipediaTitle.textContent = articleName;
                            //append header to the section
                            wikipediaSection.appendChild(wikipediaTitle);
                            //create paragraph element
                            var wikipeidaText = document.createElement("p");
                            //fill paragraph element with text
                            wikipediaText.textContent = articleDesc;
                            //append paragraph to the section
                            wikipediaSection.appendChild(wikipediaText);
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
    var searchTerms = search.value.replace(/\s/g, '+');
    // var videoId = "";
    // var yInfoURL = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=AIzaSyCS2ZElMlvF3ZCgpzJ5hljHUNlDdcXlB94&part=snippet,statistics&fields=items(id,snippet,statistics)";
    // var ySearchURL = "https://www.googleapis.com/youtube/v3/search&part=snippet&type=video&videoEmbeddable=true"

const APIKEY = "&key=AIzaSyCS2ZElMlvF3ZCgpzJ5hljHUNlDdcXlB94"  //API key
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&q='; //search API for Youtube

let searchYouTube = youtubeAPI + searchTerms + APIKEY
//fetch video responses from youtube
fetch(searchYouTube)
        .then(function(response) {return response.json();})
        .then(function(data){
            console.log(data);
        })

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
