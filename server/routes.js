var yelpSearch = require('./controllers/yelpSearch.js');

//TODO Our API to do stuff
module.exports = function (app){
  app.get('/search/:city/:category', yelpSearch.search);
}
