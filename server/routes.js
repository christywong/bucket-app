var yelpSearch = require('./controllers/yelpSearch.js');
var bucketHome = require('./controllers/bucket-group.js');
var fs = require('fs');
var path = require('path');
var JSONDATA = path.join(__dirname, 'Data.json');
var Group = require('./models/BucketGroup.js');
var Member = require('./models/Members.js');


//TODO Our API to do stuff
module.exports = function (app){
  app.get('/search/:city/:category/:offset', yelpSearch.search);
  app.get('/searchCity/:city/:offset',yelpSearch.searchCity);
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

  app.post('/api/postData', function(req,res){
    console.log('saving data');
    console.log(req.body);
    fs.writeFile(JSONDATA, req.body, function(err, data){
      if(err){
        console.log('oh no error writing to the file');
        return err;
      }else {
        console.log('success')
        console.log(data);
      }
    })
  });

  //List the current group
  app.get('/api/getGroup/:groupId', Group.actions.getGroup);
  //Create a card
  app.post('/api/createCard', Group.actions.createCard);
  //Delete a card
  app.delete('/api/deleteCard', Group.actions.deleteCard);
  //Move a card
  app.put('/api/moveCard', Group.actions.moveCard);
  //Create a new Bucket
  app.post('/api/createBucket', Group.actions.createBucket);
  //Delete a Bucket
  app.delete('/api/deleteBucket', Group.actions.deleteBucket);

  //Return a list of all the groups
  app.get('/api/getAllGroups', Group.actions.getAllGroups);
  //Creates a new group in the database
  app.post('/api/createGroup', Group.actions.createGroup);
  //add a friend to the group
  app.post('/api/addFriend', Group.actions.addFriend);

  //Routes for changing Members
  app.post('/api/createMember', Member.actions.createMember);
  app.post('/api/searchMember', Member.actions.searchMember);
  app.post('/api/changePassword', Member.actions.changePassword);
  app.post('/api/changeFirstTimeState', Member.actions.changeFirstTimeState);

}
