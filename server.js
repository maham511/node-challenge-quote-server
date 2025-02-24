// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Maha's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

//returns all quotes in json
app.get("/quotes", (req, res) => {
  res.send(quotes);
});

//returns random quote json using pickFromArray function
app.get("/quotes/random", (req, res) => {
  res.send(pickFromArray(quotes));
});

//--------------------

//Level 2

//returns search query
app.get('/quotes/search/', sendQuote);

function sendQuote(req, res) {
  let term = req.query.term; //query param for user
  term = term.toLowerCase(); //for case-insensitive search

  //filters quotes arr, returns objs including search term in quote or author values, case insensitive 
  const filteredQuotes = quotes.filter(( {quote, author} ) => {
    return (
      quote.toLowerCase().includes(term) ||
      author.toLowerCase().includes(term)
    );
  });

  res.send(filteredQuotes);
}

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
