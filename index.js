'use strict';

// const apiKey = "833ea1b9d7mshbef97797dff363dp1d9ac4jsna2801a24e32d";

const searchURL = 'https://api.github.com/users/';


// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].description}</p>
      <p>Language: ${responseJson[i].language}</p>
      <p>By: ${responseJson[i].owner.login}</p>
      </li><hr>`
    )};
  //display the results section
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const params = {
    q: query,
    maxResults: 10
  };
  //const queryString = formatQueryParams(params)
  const url = `${searchURL}${params.q}/repos?per_page=${params.maxResults}`;

  console.log("This is the url:" + url);



  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, params.maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getRepos(userName);
  });
}

$(watchForm);
