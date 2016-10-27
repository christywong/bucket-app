var yelpSearch = require('./controllers/yelpSearch.js');
var bucketHome = require('./controllers/bucket-group.js');

//TODO Our API to do stuff
module.exports = function (app){
  app.get('/search/:city/:category', yelpSearch.search);
  app.get('/home', bucketHome.view);
}

