import React from 'react';
var styles = require("../static/styles/main.scss");
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';
import AccountSettingsModal from './modals/AccountSettingsModal';
import {Modal,Button} from "react-bootstrap";
import AddGroupModal from './modals/AddGroupModal';
import AddMemberModal from './modals/AddMemberModal';
import AddBucketModal from './modals/AddBucketModal';
import HelpModal from './modals/HelpModal';
var Loader = require('react-loader');
//import AddModal from './modals/AddCardModal';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listOfGroups:[],
      showModal: false,
      currentBucket: '0',
      currentGroup: '',
      myBucketId: '',
      currentUser: 'testuser',
      currentUserId: '',
      showBucketModal: false,
      showGroupModal: false,
      showMemberModal: false,
      showHelpModal: JSON.parse(localStorage.getItem('firstTimeUser')),
      showAccountSettingsModal: false,
      pageLoaded: false,
      fakeLoader: true
    }

    this.changeGroup = this.changeGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeSelectedBucket = this.changeSelectedBucket.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.changeMyBucket = this.changeMyBucket.bind(this);

    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);
    this.showAddGroupModal = this.showAddGroupModal.bind(this);
    this.closeAddGroupModal = this.closeAddGroupModal.bind(this);
    this.showAddMemberModal = this.showAddMemberModal.bind(this);
    this.closeAddMemberModal = this.closeAddMemberModal.bind(this);
    this.showAddBucketModal = this.showAddBucketModal.bind(this);
    this.closeAddBucketModal = this.closeAddBucketModal.bind(this);
    this.showHelpModal = this.showHelpModal.bind(this);
    this.closeHelpModal = this.closeHelpModal.bind(this);

  }

  //Call our remote endpoints to initialize our application
  componentDidMount() {
    var currentGroupId = localStorage.getItem('userGroupId');
    var currentUserId = localStorage.getItem('memberId');
    var currentUsername = localStorage.getItem('username');
    var showHelpModal = JSON.parse(localStorage.getItem('firstTimeUser'));

    this.setState({
      currentGroup: currentGroupId,
      currentUserId: currentUserId,
      currentUserName: currentUsername,
      myBucketId: currentGroupId
    });

    if(showHelpModal){
      this.apiChangeMemberHelpModalState(currentUserId);
      localStorage.setItem('firstTimeUser','false');
    }

    this.loadJSONData(currentGroupId);
    //this.getAllGroups();
    this.getUserGroups(currentUserId);
  }
/*
<Loader
  loaded={this.state.fakeLoader}
  lines={13}
  length={20}
  width={10}
  radius={30}
  corners={1} rotate={0} direction={1} color="#000" speed={1}
  trail={60} shadow={false} hwaccel={false} className="spinner"
  zIndex={2e9} top="50%" left="50%" scale={1.00}
  loadedClassName="loadedContent" >
</Loader>
{!this.state.fakeLoader ? <div className="fake-loader-overlay" /> : null}
*/
  render(){
    let close = () => this.setState({ showModal2: false});
    return (
      <div>
        <Loader
          loaded={this.state.pageLoaded}
        >
        <NavbarInstance
          currentGroup ={this.state.data}
          groups = {this.state.listOfGroups}
          changeGroup = {this.changeGroup}
          addGroup = {this.addGroup}
          addMember = {this.addMember}
          changeMyBucket = {this.changeMyBucket}
          showSettings = {this.showAccountSettingsModal}
          showGroups = {this.showAddGroupModal}
          showMember = {this.showAddMemberModal}
          showBucket = {this.showAddBucketModal}
          showHelp = {this.showHelpModal}
        />

        {
          this.state.showAccountSettingsModal ?
          <AccountSettingsModal
            close={this.closeAccountSettingsModal}
            changePassword={this.changePassword}
            visibility={this.state.showAccountSettingsModal}/>
          :null
        }
        {
          this.state.showGroupModal ?
          <AddGroupModal
            close={this.closeAddGroupModal}
            visibility={this.state.showGroupModal}
            addGroup={this.addGroup}
            groups = {this.state.listOfGroups}
            changeGroup = {this.changeGroup}
            />
          :null
        }
        {
          this.state.showMemberModal ?
          <AddMemberModal
            close={this.closeAddMemberModal}
            visibility={this.state.showMemberModal}
            addMember = {this.addMember}
            friendsList ={this.state.data.members}/>
          :null
        }
        {
          this.state.showBucketModal ?
          <AddBucketModal
            close = {this.closeAddBucketModal}
            visibility = {this.state.showBucketModal}
            addBucket = {this.addBucket} />
          : null
        }
        {
          this.state.showHelpModal ?
          <HelpModal
            close={this.closeHelpModal}
            visibility={this.state.showHelpModal}/>
          :null
        }

        <Main
          currentGroupData ={this.state.data}
          allGroups = {this.state.data.tags}
          currentBucketId = {this.state.currentBucket}
          currentGroup = {this.state.currentGroup}
          addBucket = {this.addBucket}
          deleteBucket = {this.deleteBucket}
          showBucketModal = {this.showAddBucketModal}
          changeSelected = {this.changeSelectedBucket}
          addCard = {this.addCard}
          deleteCard = {this.deleteCard}

        />
    </Loader>

      </div>
    );
  }

  changeSelectedBucket(selectedBucketId){
    this.setState({
      currentBucket: selectedBucketId
    })
  }

  /**
   * Changes the state of the selected bucket
   * @param {string} selectedBucketId - The bucket id that is to be switched too
   **/
  changeSelectedBucket(selectedBucketId){
    this.setState({
      currentBucket: selectedBucketId
    })
  }

  /**
   * Creates a card in the specified Bucket.
   * @param {object} card - Information from yelp results in order to build a new card.
   * @param {number} bucketId - The id of the bucket that the card will be added too.
   **/
  addCard(card, bucketId){
    var tagId = bucketId !== "0" ? bucketId : null;

    //Build the new Card we want to Add
    const newCard = {
      id: uuid.v4(),
      yelpId: card.id,
      yelpUrl: card.url,
      img: card.image_url,
      rating: card.rating_img_url,
      city: card.location.city,
      reviewCount: card.review_count,
      title: card.name,
      tags: [bucketId]
    }

    const updatedGroup = update(this.state.data, {activities: {$push: [newCard]}});

    //Add cards to the state in APP
    this.apiCreateCard(newCard, this.state.currentGroup);
    this.setState({
      data: updatedGroup
    });
  }

  /**
  * Deletes a card from a group.
  * @param {Number} cardId - The id of the card that we want to remove.
  */
  deleteCard(cardId){
    //const filteredCardsNextState = this.state.filteredCards.filter((oldCard)=>(oldCard.id!==cardId));
    const deletedCard = this.state.data.activities.filter((oldCard)=>(oldCard.id!==cardId));
    const cardsNextState = update(this.state.data, {activities: {$set: deletedCard}});
    //make a call to our api
    this.apiDeleteCard(cardId, this.state.currentGroup);

    //set our new state
    this.setState({
      data: cardsNextState //: update(this.state.buckets, {cards: {$set: bucketNextState}}),
    })
  }

  /**
   * Grab data for the newly selected Group Id
   **/
  changeGroup(newGroupId){
    const newGroup = this.state.listOfGroups.filter((group)=>(newGroupId===group.id))[0];
    this.setState({
      currentGroup: newGroupId,
      currentBucket: '0',
      pageLoaded: false
    })
    this.loadJSONData(newGroupId);
  }

  changeMyBucket(){
    this.setState({
      fakeLoader: false
    });

    setTimeout(function(){
      this.setState({
        fakeLoader: true
      })
    }.bind(this), 200);
    this.changeGroup(this.state.myBucketId);
  }

  /**
   * Adds a bucket into a new group
   * @param name {string} Name of the bucket to be created
   * @param groupId {string} Id of the group to put the bucket in
   **/
  addBucket(name) {
    if (name != "") {
      var newBucketName = name.charAt(0).toUpperCase() + name.slice(1);
      const newBucket = {id: uuid.v4(), title: newBucketName};
      this.apiCreateBucket(newBucket);
    }
  }

  deleteBucket(bucketId) {

    this.apiDeleteBucket(bucketId);
  }
  /**
   * Creates a new Group
   * @param name {string} Name of the Group to be added.
   **/
  addGroup(name) {

    if (name != "") {
      var newName = name.charAt(0).toUpperCase() + name.slice(1);

      var newGroup = {
        id: uuid.v4(),
        title: newName,
        members: [this.state.currentUser],
        tags: [{"id": "0", "title": "All"}],
        activities: []
      };

      //var newGroupList = [...this.state.listOfGroups, newGroup];
      this.apiCreateGroup(newGroup);
    }
  }

  /**
   * Add a new member into a Group
   * @param name {string} Name of the member to be added to the group
   * @param currentGroupId {string} Id of the group that member is to be added to
   **/
  addMember(name){
    if (name != ""){
      var newMember = name.charAt(0).toUpperCase() + name.slice(1);
      this.apiAddFriend(newMember);
    }
  }

  //Modal Functions
  showAccountSettingsModal(){
    this.setState({showAccountSettingsModal: true});
  }

  closeAccountSettingsModal(){
    this.setState({showAccountSettingsModal: false});
  }

  showAddGroupModal(){
    this.setState({showGroupModal:true});
  }

  closeAddGroupModal(){
    this.setState({showGroupModal:false});
  }

  showAddMemberModal(){
    this.setState({showMemberModal:true});
  }

  closeAddMemberModal(){
    this.setState({showMemberModal:false});
  }

  showAddBucketModal(){
    this.setState({showBucketModal:true});
  }

  closeAddBucketModal(){
    this.setState({showBucketModal:false});
  }
  showHelpModal(){
    this.setState({showHelpModal:true});
  }

  closeHelpModal(){
    this.setState({showHelpModal:false});
  }

  /**
   * API call to initialize data for a group
   * @param {string} currentGroup The id of the group to retrieve data from.
   **/
  loadJSONData(currentGroup){
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          me.setState({
            data: result,
            pageLoaded: true
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('GET', '/api/getGroup/' + currentGroup);
    xhr.responseType = 'json'
    xhr.send();
  }

  /**
   * API call to get a list of groups
   **/
  getAllGroups(){
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          me.setState({
            listOfGroups: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('GET', '/api/getAllGroups/');
    xhr.responseType = 'json'
    xhr.send();
  }

  /**
   * Gets all the Groups associated with the Current User
   **/
  getUserGroups(currentUserId){
    var me = this;
    //var userId = this.state.currentUserId;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          me.setState({
            listOfGroups: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('GET', '/api/getUserGroups/' + currentUserId);
    xhr.responseType = 'json'
    xhr.send();

  }

  changePassword(newPassword){
    if(newPassword.length > 3){
      this.apiChangePassword(this.state.currentUserId, newPassword);
    }
  }
  /**
   * Create Card
   **/
   apiCreateCard(newCard, groupId){
     var me = this;
     var xhr = new XMLHttpRequest();
     var payload = 'id=' + newCard.id + '&yelpId=' + newCard.yelpId + '&yelpUrl=' + newCard.yelpUrl + '&img=' + newCard.img + '&rating=' + newCard.rating + '&city=' + newCard.city + '&reviewCount=' + newCard.reviewCount + '&title=' + newCard.title + '&tags=' + newCard.tags + '&groupId=' + groupId;
     xhr.onreadystatechange = function(){
       if(xhr.readystate === 4){
         if(xhr.status === 200){
         } else{
           console.log('oops there was an error');
         }
       }
     }
     xhr.open('POST', '/api/createCard');
     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
     xhr.send(payload);
   }

   apiDeleteCard(cardId, groupId){
     var me = this;
     var xhr = new XMLHttpRequest();
     var payload = 'cardId=' + cardId + '&groupId=' + groupId;

     xhr.onreadystatechange = function(){
       if(xhr.readystate === 4){
         if(xhr.status === 200){

         } else{
           console.log('oops there was an error');
         }
       }
     }

     xhr.open('DELETE', '/api/deleteCard');
     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
     xhr.send(payload);
   }

  /**
   * API call to create a new Group
   * @param {Object} newGroup  The newly created group object to be added to the database
   **/
  apiCreateGroup(newGroup){
    var me = this;

    //TODO look into where newGroup.members is coming from
    var payload = 'groupId=' + newGroup.id + '&title=' + newGroup.title + '&members=' + newGroup.members + '&tagId=' + newGroup.tags[0].id + '&tagTitle=' + newGroup.tags[0].title + '&memberId='+this.state.currentUserId;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;

          var newGroupList = [...me.state.listOfGroups, result];
          me.setState({
            listOfGroups: newGroupList
          });
          me.changeGroup(result._id);
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('POST', '/api/createGroup');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json'
    xhr.send(payload);
  }

  /**
   * API call to create a friend
   * @param {string} newFriend The name of the person we want to add to the group
   **/
  apiAddFriend(newFriend){
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = "person="+newFriend + "&groupId=" + this.state.currentGroup;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          me.setState({
            data : result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('POST', '/api/addFriend');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json'
    xhr.send(payload);
  }

  apiCreateBucket(newBucket) {
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = "bucket=" + newBucket.title + "&groupId=" + this.state.currentGroup;
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          var result = xhr.response;
          me.setState({
            data: result
          });
        } else {
          console.log('Oops an error occurred');
        }
      }
    }
    xhr.open('POST', '/api/createBucket');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json'
    xhr.send(payload);
  }

  apiDeleteBucket(bucketId) {
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = 'bucketId=' + bucketId + '&groupId=' + this.state.currentGroup;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          me.setState({
            data: result
          });
        } else{
          console.log('Oops an error occurred');
        }
      }
    }

      xhr.open('DELETE', '/api/deleteBucket');
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.responseType = 'json'
      xhr.send(payload);
  }

  apiChangePassword(memberId, newPassword){
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = 'memberId=' + memberId + '&newPassword=' + newPassword;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
        } else{
          console.log('Oops an error occurred');
        }
      }
    }

    xhr.open('POST', '/api/changePassword');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json'
    xhr.send(payload);
  }

  apiChangeMemberHelpModalState(userId){
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = 'userId=' + userId;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('sucess!');
        } else{
          console.log('Oops an error occurred');
        }
      }
    }

    xhr.open('POST', '/api/changeFirstTimeState');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = 'json'
    xhr.send(payload);
  }

}
