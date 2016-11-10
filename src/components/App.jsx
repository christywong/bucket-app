import React from 'react';
var styles = require("../static/styles/main.scss");
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';
import AccountSettingsModal from './modals/AccountSettingsModal';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listOfGroups:[],
      showModal: false,
      currentBucket: "0",
      currentGroup: '5822d9275328dbcd7ba033d6',
      currentUser: 'Alok'
    }

    this.changeGroup = this.changeGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.addMember = this.addMember.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);

    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);

  }

  componentDidMount() {
    this.loadJSONData(this.state.currentGroup);
    this.getAllGroups();
  }

  render(){
    return (
      <div>
        <NavbarInstance
          currentGroup ={this.state.data}
          groups = {this.state.listOfGroups}
          changeGroup = {this.changeGroup}
          addGroup = {this.addGroup}
          addMember = {this.addMember}
          showSettings = {this.showAccountSettingsModal}
          />
        {
          this.state.showModal ?
          <AccountSettingsModal close={this.closeAccountSettingsModal} />
          : null
        }
        <Main
          currentGroupData ={this.state.data}
          allGroups = {this.state.data.tags}
          currentBucketId = {this.state.currentBucket}
          addBucket = {this.addBucket}
          currentGroup = {this.state.currentGroup}
          deleteBucket = {this.deleteBucket}
          />
      </div>
    );
  }

  changeGroup(newGroupId){
    console.log(newGroupId);
    const newGroup = this.state.listOfGroups.filter((group)=>(newGroupId===group.id))[0];
    this.loadJSONData(newGroupId);

  }

  addBucket(name, groupId) {
    //console.log('adding bucket ', this.state.data.currentGroup.tags);
    console.log(name, groupId);

    //if (name != "") {
      var newBucketName = name.charAt(0).toUpperCase() + name.slice(1);
      const newBucket = {id: uuid.v4(), title: newBucketName};
      // const nextCurrentGroupState = update(this.state.data.currentGroup, {tags: {$push: [newBucket]}});
      // const nextGroup = this.state.data.groups.map((group)=>{
      //   if(group.id === groupId){
      //     group.tags.push(newBucket);
      //   }
      //   return group;
      // })

      // const nextData = {groups: nextGroup, currentGroup: nextCurrentGroupState};
      // console.log(nextData);
      // this.setState({
      //   data: nextData
      // });

      this.apiCreateBucket(newBucket);
   // }
  }

  deleteBucket(bucketId) {
    this.apiDeleteBucket(bucketId);
  }

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

      var newGroupList = [...this.state.listOfGroups, newGroup];
     //  console.log(newGroupList);
      this.apiCreateGroup(newGroup);

      // this.setState({
      //   listOfGroups: newGroupList
      // });
    }
  }

  addMember(name, currentGroupId){
    console.log(name);
    if (name != ""){
      var newMember = {
        id: uuid.v4(),
        name: name.charAt(0).toUpperCase() + name.slice(1)
      }
      var newMemberArray = [...this.state.data.currentGroup.members, newMember];
      const nextState = update(this.state.data.currentGroup, {members: {$set: newMemberArray}});

      const nextGroupState = this.state.data.groups.map((group) => {
        if(group.id === currentGroupId){
          group.members.push(newMember);
        }
        return group;
      });

      const nextDataState = {
        groups: nextGroupState,
        currentGroup: nextState
      }
      console.log(nextDataState);
      this.setState({
        data: nextDataState
      });
    }
  }

  showAccountSettingsModal(){
    this.setState({showModal: true});
  }

  closeAccountSettingsModal(){
    this.setState({showModal: false});
  }

  //API call to initialize our Application
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
          console.log('result from create bucket: ', result);
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
          console.log('result: ', result);
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

}
