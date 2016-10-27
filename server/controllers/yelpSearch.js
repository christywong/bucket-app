var Yelp = require('yelp');
const config = require('config');

var CONSUMER_KEY;
var CONSUMER_SECRET;
var TOKEN;
var TOKEN_SECRET;

if (process.env.LOCAL === 'true'){
  CONSUMER_KEY    = config.get('consumer_key');
  CONSUMER_SECRET = config.get('consumer_secret');
  TOKEN           = config.get('token');
  TOKEN_SECRET    = config.get('token_secret');
} else {
  console.log('TESTING KEYS ON HEROKU!!!!');
  CONSUMER_KEY    = process.env.CONSUMER_KEY;
  CONSUMER_SECRET = process.env.CONSUMER_SECRET;
  TOKEN           = process.env.TOKEN;
  TOKEN_SECRET    = process.env.TOKEN_SECRET;

  console.log(CONSUMER_KEY);
  console.log(CONSUMER_SECRET);
  console.log(TOKEN);
  console.log(TOKEN_SECRET);
}

var yelp = new Yelp({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  token: TOKEN,
  token_secret: TOKEN_SECRET
});

module.exports = {};

module.exports.search = function(req,res){
  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: req.params.category, location: req.params.city, limit: 5 })
  .then(function (data) {
    res.send(data);
  })
  .catch(function (err) {
    console.error(err);
  });
}
