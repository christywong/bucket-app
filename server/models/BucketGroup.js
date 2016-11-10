const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      uuid     = require('uuid');

var GroupSchema = new Schema({
  title: String,
  tags: [{id: String, title: String, typeOfBucket: Number}],
  members: [{id: String, name: String}],
  activities:[
    {
      id: String,
      yelpId: String,
      yelpUrl: String,
      img : String,
      rating : String,
      city: String,
      reviewCount: Number,
      title: String,
      tags: [String]
    }
  ]
});
var Groups = mongoose.model('groups', GroupSchema);

//var Groups = mongoose.model('bucketgroups', GroupSchema);

module.exports.actions = {};

module.exports.actions.getGroup = function(req,res){
  Groups.findOne({"_id":req.params.groupId
  }, function(err, group){
    if(err){
      console.log('an error occured');
      console.log(err);
      return err;
    }
    else{
      console.log(group);
      return res.status(200).json(group);
      ;
    }
  })
}

module.exports.actions.createCard = function(req,res){
  console.log('creating a card');
  var newCard = {
    id: req.body.id,
    yelpId: req.body.yelpId,
    yelpUrl: req.body.yelpUrl,
    img: req.body.img,
    rating: req.body.rating,
    city: req.body.city,
    reviewCount: req.body.reviewCount,
    title: req.body.title,
    tags: req.body.tags
  }

  Groups.findOneAndUpdate({'_id':req.body.groupId}, {$push: {activities: newCard}},{new: true}, function(err, data){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      console.log(data);
      return res.status(200);
    }
  })

};

module.exports.actions.deleteCard = function(req, res){
  console.log('deleteing a card');
  var groupId = req.body.groupId;
  var cardId = req.body.cardId;
  Groups.findOneAndUpdate({'_id':groupId},{$pull:{activities: {'id': cardId}}},{new:true},function(err,data){
    if(err){
      console.log('oh no something went wrong');
      return err;
    }
    else{
      console.log(data);
      return res.status(200);
    }
  })
}

module.exports.actions.moveCard = function(req,res){
  var groupId = req.body.groupId;
  var cardId = req.body.cardId;
  var newTag = req.body.tags;
  console.log('moving a card: ',cardId);
  console.log(groupId);
  Groups.findOneAndUpdate({'_id': groupId, 'activities.id': cardId},{$set :{
    'activities.$.tags': newTag
  }}, function(err,data){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      console.log(data);
      return res.status(200);
    }
  })
}

module.exports.actions.getAllGroups = function(req,res){
  Groups.find({},'_id title', function(err, listOfGroups){
    if(err){
      console.log('oh no something went wrong');
      return err;
    }
    else{
      return res.status(200).json(listOfGroups);
    }
  })
}

module.exports.actions.createGroup = function(req,res){
  console.log('creating a new group :)');

  var newGroup = new Groups({
    title   : req.body.title,
    members : {name: req.body.members},
    tags    : [{id: 0, typeOfBucket: 1, title: "All"}]
  });

  console.log('new group ', newGroup);
  newGroup.save(function(err,group){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      console.log(group);
      console.log('new group added to the db ');
      return res.status(200).json(group);
    }
  })
}

module.exports.actions.addFriend = function(req,res){
  var groupId = req.body.groupId;
  var person = req.body.person;

  var newFriend = {
    name: person
  }
  console.log(newFriend);
  Groups.findOneAndUpdate({'_id': groupId},{$push:{members: newFriend}},{new: true}, function(err,group){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      console.log(group);
      console.log('new friend added');
      return res.status(200).json(group);
    }
  });
}

module.exports.actions.createBucket = function(req,res){
  //id of group we want to add the bucket too
  console.log('adding a bucket');
  var groupId = req.body.groupId;
  //name of new bucket
  var bucketTitle = req.body.bucket;
  var newBucket = {
    id: uuid.v4(),
    title : bucketTitle,
    typeOfBucket : 0
  }
  console.log('bucket title ', bucketTitle, 'groupId ', groupId);
  Groups.findOneAndUpdate({'_id':groupId},{$push: {tags: newBucket}},{new: true},
    function(err,group){
      if(err){
        console.log(err);
        return err;
      }
      console.log('new group ', group);
      return res.status(200).json(group);
  })
}

module.exports.actions.deleteBucket = function(req,res){

}
