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

var Groups = mongoose.model('groups', GroupSchema);

module.exports.actions = {};

module.exports.actions.getGroup = function(req,res){
  console.log('searching for a group');
  Groups.find({
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
