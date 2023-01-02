//set necessary variables
//text from search bar
var search = document.getElementById("search");
var searchBtn = document.getElementById("searchBtn");
var searchTerms = search.value.replace(/\s/g, '+');
//define wikipedia title and text
var wikiTitle = document.getElementById("wikipediaTitle");
var wikiText = document.getElementById("wikipediaText");
//define wikipedia element section
var wikipediaSection = document.getElementById("wikipedia");
//define youtube title and text
var ytubeTitle = document.getElementById("youtubeTitle");
var ytubeText = document.getElementById("youtubeText");
var youtubeSection = document.getElementById("Youtube");




//set call Wikipedia function
function callWikipediaAPI() {
    //clear section content when function is called
    wikipediaSection.innerHTML = "";
    //run the API
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
            for (var i=0; i<data[1].length; i++) {
                //we do the makeArticleCard stuff as a function so i has the proper values for each card
                function makeArticleCard() {
                    var articleName = data[1][i];
                    //fetch description from a given page
                    fetch("https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + articleName + "&prop=text&section=0&utf8=1&origin=*")
                        .then(function(response) {return response.json();})
                        .then(function(data) {
                        console.log(data);
                        if (data.error) return;
                        //if the article doesn't redirect, pull it
                        if (!data.parse.text["*"].includes("redirectMsg")) {
                            var articleDesc = data.parse.text["*"].substring(data.parse.text["*"].indexOf("display")+14, data.parse.text["*"].indexOf("</div>"));
                            //console log for debugging
                            console.log(articleDesc);
                            console.log(articleName);
                            //card
                            var articleCard = document.createElement("card");
                            articleCard.classList.add("wArticleCard");
                            wikipediaSection.appendChild(articleCard);
                            //title
                            var wikipediaTitleLink = document.createElement("a");
                            wikipediaTitleLink.classList.add("articleName");
                            var wikipediaTitle = document.createTextNode(articleName);
                            wikipediaTitleLink.appendChild(wikipediaTitle);
                            wikipediaTitleLink.title = articleName;
                            var articleLink = "https://en.wikipedia.org/wiki/" + articleName;
                            wikipediaTitleLink.href = articleLink;
                            articleCard.appendChild(wikipediaTitleLink);
                            //description
                            var wikipediaText = document.createElement("p");
                            //check for an accurate description using length. Anything too long is assumed to be a faulty parse or abnormal article format and is skipped
                            if (articleDesc.length<200) {
                                wikipediaText.textContent = articleDesc;
                            }
                            articleCard.appendChild(wikipediaText);
                        }
                        //else, find the redirect article and pull that instead
                        //function removed due to being a headache
                        else {
                            return;
                            //console.log("Article '" + articleName + "' redirects");
                            //articleName = data.parse.text["*"].substring(data.parse.text["*"].indexOf("title="+7, data.parse.text["*"].indexOf(">", data.parse.text["*"].indexOf("title="))));
                            //fetchDescription();
                            }
                        })
                }
                makeArticleCard();
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

    //search for videos
    const APIKEY = "&key=AIzaSyCS2ZElMlvF3ZCgpzJ5hljHUNlDdcXlB94"  //API key
    const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&q='; //search API for Youtube

    let searchYouTube = youtubeAPI + searchTerms + APIKEY;
    //fetch video responses from youtube
    fetch(searchYouTube)
        .then(function(response) {return response.json();})
        .then(function(data){
            console.log(data);
            //clear YouTube section
            youtubeSection.innerHTML = "";
            //download API script
            var tag = document.createElement('script');
            tag.id = 'iframe';
            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            //video player API and create cards
            for (i=0; i<data.items.length; i++) {
                //creating iplayer
                var playerElement = document.createElement("iframe");
                playerElement.id = "player";
                var embedVideoID = data.items[i].id.videoId;
                videoEmbedURL = "https://www.youtube.com/embed/" + embedVideoID;
                playerElement.src = videoEmbedURL;
                youtubeSection.appendChild(playerElement);
            }
        })

}





 
//set function for pressing search button
searchBtn.addEventListener("click", function(){
    //don't search for anything unless there's something to search for
    if (search.value) {
        callWikipediaAPI();
        callYouTubeAPI();
    }
});
