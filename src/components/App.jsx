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
      currentUser: 'Daniel',
      currentUserId: '',
      showBucketModal: false,
      showGroupModal: false,
      showMemberModal: false,
      showHelpModal: JSON.parse(localStorage.getItem('firstTimeUser')),
      showAccountSettingsModal: false
      }

    this.changeGroup = this.changeGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeSelectedBucket = this.changeSelectedBucket.bind(this);
    this.addCard = this.addCard.bind(this);

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
    //this.showAddModal = this.showAddModal.bind(this);
    //this.closeAddModal = this.closeAddModal.bind(this);

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
      currentUserName: currentUsername
    });
    console.log('show help modal ', showHelpModal);
    if(showHelpModal){
      console.log('calling api change state');
      this.apiChangeMemberHelpModalState(currentUserId);
      localStorage.setItem('firstTimeUser','false');
    }
    console.log(this.state.showHelpModal);
    this.loadJSONData(currentGroupId);
    this.getAllGroups();
  }

  render(){
    let close = () => this.setState({ showModal2: false});
    return (
      <div>
        <NavbarInstance
          currentGroup ={this.state.data}
          groups = {this.state.listOfGroups}
          changeGroup = {this.changeGroup}
          addGroup = {this.addGroup}
          addMember = {this.addMember}
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
          addBucket = {this.addBucket}
          currentGroup = {this.state.currentGroup}
          deleteBucket = {this.deleteBucket}
          showBucketModal = {this.showAddBucketModal}
          changeSelected = {this.changeSelectedBucket}
          addCard = {this.addCard}
        />
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
   * Grab data for the newly selected Group Id
   **/
  changeGroup(newGroupId){
    const newGroup = this.state.listOfGroups.filter((group)=>(newGroupId===group.id))[0];
    this.setState({
      currentGroup: newGroupId,
      currentBucket: '0'
    })
    this.loadJSONData(newGroupId);
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
    console.log('name of new group ', name);
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
    console.log('closing modal');
    this.setState({showHelpModal:true});
  }

  closeHelpModal(){
    this.setState({showHelpModal:false});
  }

  // showAddModal(){
  //   this.setState({showAddModal:true});
  // }

  // closeAddModal(){
  //   this.setState({showAddModal:false});
  // }





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
            data: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    console.log('getting data from server');
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
    console.log('getting data from server');
    xhr.open('GET', '/api/getAllGroups/');
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
           console.log('success!');
           console.log(xhr.response);
         } else{
           console.log('oops there was an error');
         }
       }
     }
     xhr.open('POST', '/api/createCard');
     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
     console.log(payload);
     xhr.send(payload);
   }

  /**
   * API call to create a new Group
   * @param {Object} newGroup  The newly created group object to be added to the database
   **/
  apiCreateGroup(newGroup){
    var me = this;
    var payload = 'groupId=' + newGroup.id + '&title=' + newGroup.title + '&members=' + newGroup.members + '&tagId=' + newGroup.tags[0].id + '&tagTitle=' + newGroup.tags[0].title;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          console.log('result from adding a group ', result);
          console.log('list of groups ', me.state.listOfGroups);
          var newGroupList = [...me.state.listOfGroups, result];
          me.setState({
            listOfGroups: newGroupList
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    console.log('getting data from server');
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

      xhr.open('DELETE', '/api/deleteBucket');
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.responseType = 'json'
      xhr.send(payload);
    }
  }

  apiChangePassword(memberId, newPassword){
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = 'memberId=' + memberId + '&newPassword=' + newPassword;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          console.log('result: ', result);
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
    console.log('changing to false')
    var me = this;
    var xhr = new XMLHttpRequest();
    var payload = 'userId=' + userId;
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var result = xhr.response;
          console.log('result: ', result);
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
