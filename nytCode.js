/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
var apiKey = "UpUaFsd8xtTlAaFtmTX5fnHLad9Uk1y4";
function buildQueryURL() {
  var inputArea = $("#searchterm").val().trim();
  console.log(inputArea);
  var startYear = $("#startYear");
  var endYear = $("#endYear");
  var queryUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    inputArea +
    "&api-key=" +
    apiKey;
  return queryUrl;
}
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */

function updatePage(NYTData) {
  console.log(NYTData);
  var results = NYTData.response.docs;
  for(var i = 0; i < results.length; i++){
    var h1 = $("<h1>").text(results[i].headline.main);
    console.log(h1);
    $(".article-section").append(h1);
    
  }
}
// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property

  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();
  console.log("this worked");
  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response){
    updatePage(response);
  });
});

// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
