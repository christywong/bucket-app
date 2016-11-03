var yelpSearch = require('./controllers/yelpSearch.js');
var bucketHome = require('./controllers/bucket-group.js');
var fs = require('fs');
var path = require('path');
var JSONDATA = path.join(__dirname, 'Buckets.json');
var TEST = path.join(__dirname, 'Data.json');

//TODO Our API to do stuff
module.exports = function (app){
  app.get('/search/:city/:category/:offset', yelpSearch.search);
  app.get('/home', bucketHome.view);

  app.get('/api/getData', function(req,res){
    fs.readFile(JSONDATA, function(err,data){
      if(err){
        console.log('error retrieving json occured');
        return err;
      }
      else{
        res.json(JSON.parse(data));
      }
    })
  });

  app.get('/api/getTest', function(req,res){
    fs.readFile(TEST, function(err,data){
      if(err){
        console.log('error retrieving json occured');
        return err;
      }
      else{
        res.json(JSON.parse(data));
      }
    })
  });
}
