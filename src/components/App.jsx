import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar from './utilities//Navbar';
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';
import AccountSettingsModal from './utilities/AccountSettingsModal';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {
        groups: [],
        currentGroup: {
          buckets: [],
          members: []
        }
      },
      showModal: false,
      currentBucket: 0
    }

    this.changeGroup = this.changeGroup.bind(this);
    this.addCardToGroup = this.addCardToGroup.bind(this);
    // this.addBucketToGroup = this.addBucketToGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.addMember = this.addMember.bind(this);

    this.sendJSONData = this.sendJSONData.bind(this);


    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);

  }

  componentDidMount() {
    this.loadJSONData();
  }

  render(){
    return (

      <div>
        <NavbarInstance
          currentGroup ={this.state.data.currentGroup}
          groups = {this.state.data.groups}
          changeGroup = {this.changeGroup}
          addGroup = {this.addGroup}
          addBucket = {this.addBucket}
          addMember = {this.addMember}
          showSettings = {this.showAccountSettingsModal}
          />

        {
          this.state.showModal ?
          <AccountSettingsModal close={this.closeAccountSettingsModal} />
          : null
        }
        <Main
          currentGroup =
          {this.state.data.currentGroup}
          allGroups =
          {this.state.data.groups}
          addCardToGroup = {this.addCardToGroup}
          currentBucketId = {this.state.currentBucket}
          />
      </div>
    );
  }

  loadJSONData(){
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          //set application state here
          var result = xhr.response;
          var selectedGroup = result.groups[0];
          result.currentGroup = selectedGroup;

          me.setState({
            data: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('GET', '/api/getData');
    xhr.responseType = 'json'
    xhr.send();
  }

  sendJSONData(){
    console.log('sending json data')
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('success!');
          console.log(xhr.response);
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    xhr.open('POST', '/api/postData', true);
    console.log(this.state.data);
    console.log('sending over ', JSON.stringify(this.state.data));
    xhr.send(JSON.stringify(this.state.data));
  }

  changeGroup(currentGroupId){
    console.log(currentGroupId);
    const newGroup = this.state.data.groups.filter((group)=>(currentGroupId===group.id))[0];
    this.setState({
      data: update(this.state.data, {currentGroup: {$set: newGroup}}),
      currentBucket: 0
    });
  }

  addCardToGroup(card, groupId, bucketId){
    console.log('adding card from bucket id ', bucketId);
    const nextGroupState = this.state.data.groups.map((group) =>{
      if(group.id ===  groupId){
        console.log('matching group id');
        group.buckets.cards.push(card);
      }
      return group;
    });

    this.setState({
      data: update(this.state.data, {groups: {$set: nextGroupState}}),
      currentBucket: bucketId
    })

    console.log('next group state: ', nextGroupState);
  }

  addBucket(name, groupId) {
    console.log('adding bucket ', this.state.data.currentGroup.tags);
    console.log(name);

    if (name != "") {
      var newBucketName = name.charAt(0).toUpperCase() + name.slice(1);
      const newBucket = {id: uuid.v4(), title: newBucketName};
      const nextCurrentGroupState = update(this.state.data.currentGroup, {tags: {$push: [newBucket]}});
      const nextGroup = this.state.data.groups.map((group)=>{
        if(group.id === groupId){
          group.tags.push(newBucket);
        }
        return group;
      })

      const nextData = {groups: nextGroup, currentGroup: nextCurrentGroupState};
      console.log(nextData);
      this.setState({
        data: nextData
      });
    }
  }

  addGroup(name) {
    if (name != "") {
      var newName = name.charAt(0).toUpperCase() + name.slice(1)
      var groupToAdd = {
        id: uuid.v4(),
        title: newName,
        members: [{"id": 0, "name" : "Alok"}],
        tags: [{"id": 0, "title": "All Buckets"}],
        buckets:{
          cards:[]
        }
      };

      var newGroupList = [...this.state.data.groups, groupToAdd];
      console.log(newGroupList);
      this.setState({
        data: update(this.state.data, {groups: {$set: newGroupList}})
      });
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

}
