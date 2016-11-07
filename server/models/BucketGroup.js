const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      uuid     = require('uuid');

var GroupSchema = new Schema({
  id: Number,
  title: String,
  tags: [{id: Number, title: String}],
  members: [String],
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
      tags: [Number]
    }
  ]
});

var Groups = mongoose.model('bucketgroups', GroupSchema);

module.exports.actions = {};

module.exports.actions.getGroup = function(req,res){
  Groups.findOne({"id":req.params.groupId
  }, function(err, group){
    if(err){
      console.log('an error occured');
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

  Groups.findOneAndUpdate({'id':req.body.groupId}, {$push: {activities: newCard}},{new: true}, function(err, data){
    if(err){
      console.log('oh no something went wrong');
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
  Groups.findOneAndUpdate({'id':groupId},{$pull:{activities: {'id': cardId}}},{new:true},function(err,data){
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

  Groups.findOneAndUpdate({'id': groupId, 'activities.id': cardId},{$set :{
    'activities.$.tags': newTag
  }}, function(err,data){
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

module.exports.actions.getAllGroups = function(req,res){
  Groups.find({},'id title', function(err, listOfGroups){
    if(err){
      console.log('oh no something went wrong');
      return err;
    }
    else{
      return res.status(200).json(listOfGroups);
    }
  })
}
