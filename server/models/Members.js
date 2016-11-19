const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      uuid     = require('uuid');

var MemberSchema = new Schema({
  name: String,
  username: String,
  password: String,
  groupId: String,
  firstTimeUser: Boolean
});
var Member = mongoose.model('members', MemberSchema);

module.exports.actions ={};

module.exports.actions.createMember = function(req,res){
  var person = new Member ({
    username: req.body.username,
    password: req.body.password,
    groupId: req.body.groupId,
    firstTimeUser: true
  });

  person.save(function(err,member){
    if(err){
      console.log('oh no something went wrong');
      console.log(err);
      return err;
    }
    else{
      return res.status(200).json(member);
    }
  })
}

module.exports.actions.searchMember = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  Member.findOne({'username': username, 'password': password}, function(err,member){
    if(err){
      console.log(err);
      return err;
    }
    else{
      if(member == null){
        return res.status(200).json({'found':false})
      }
      else{
        var resultFound = {
          'found': 'true',
          'groupId': member.groupId,
          'memberId': member._id,
          'firstTimeUser': member.firstTimeUser,
          'username': member.username
        };
        return res.status(200).json(resultFound);
      }
    }
  })
}

module.exports.actions.changePassword = function(req, res){
  var newPassword = req.body.newPassword;
  var memberId = req.body.memberId;
  Member.findOneAndUpdate({'_id': memberId},{'password': newPassword}, {new:true}, function(err,data){
    if(err){
      console.log(err);
      return err;
    }
    else{
      return res.status(200).json({'success': true})
    }
  })
}

module.exports.actions.changeFirstTimeState = function(req,res){
  console.log('changing state');
  var userId = req.body.userId;
  Member.findOneAndUpdate({'_id': userId}, {'firstTimeUser': false}, {new:true}, function(err,data){
    if(err){
      console.log(err);
      return err;
    }
    else{
      return res.status(200).json({'success': true})
    }
  })
}
