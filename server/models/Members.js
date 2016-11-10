const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      uuid     = require('uuid');

var MemberSchema = new Schema({
  name: String,
  username: String,
  password: String,
  personId: String,
  firstTimeUser: Boolean
});
var Member = mongoose.model('members', MemberSchema);

module.exports.actions ={};

module.exports.actions.createMember = function(req,res){
  var person = new Member ({
    username: req.body.username,
    password: req.body.password
  });

  person.save(function(err,member){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      console.log(member);
      return res.status(200).json(member.username);
    }
  })
}

module.exports.actions.searchmember = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  Member.findOne({'username': username, 'password': password}, function(err,member){
    if(err){
      console.log(err);
      return err;
    }
    else{
      console.log(member);
      return res.stats(200).json({'found': 'true', 'firstTimeUser': member.firstTimeUser});
    }
  })
}
