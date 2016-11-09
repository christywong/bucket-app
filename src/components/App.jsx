import React from 'react';
var styles = require("../static/styles/main.scss");
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';
import AccountSettingsModal from './modals/AccountSettingsModal';
import {Modal,Button} from "react-bootstrap";

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      listOfGroups:[],
      showModal: false,
      showModal2: false,
      currentBucket: "0",
      currentGroup: '581fcd1fdcba0f6bf2649630',
      currentUser: 'Alok'

    }

    this.changeGroup = this.changeGroup.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.addMember = this.addMember.bind(this);

    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);

  }

  componentDidMount() {

    this.loadJSONData(this.state.currentGroup);
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
          currentGroupData =
          {this.state.data}
          allGroups =
          {this.state.data.tags}
          currentBucketId = {this.state.currentBucket}
          />

          //Modals
//add modal for addGroup
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                close();
                this.setState({showPager:false});
              }}>&times;</Button>
            <Modal.Title>
              Create Group
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Name Your Group</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Group Name"
                name="Group Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              close();
              this.setState({showPager:false});
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addGroup}>Create</Button>
          </Modal.Footer>
            </Modal.Dialog>
      </div>

//add modal for addBucket
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                close();
                this.setState({showPager:false});
              }}>&times;</Button>
            <Modal.Title>
              Add Bucket
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Name Your Bucket</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Bucket Name"
                name="Bucket Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              close();
              this.setState({showPager:false});
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addBucket}>Add</Button>
          </Modal.Footer>
            </Modal.Dialog>
      </div>


//add modal for addMember

   <div className="static-modal">
          <Modal
          show={this.state.showModal2}
          onHide={close}
          container={this}
          >

        <Modal.Dialog>
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                close();
                this.setState({showPager:false});
              }}>&times;</Button>
            <Modal.Title>
              Add Friends
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Add a Friend</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Friend's Name"
                name="Friend's Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              close();
              this.setState({showPager:false});
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addMember}>Add</Button>
          </Modal.Footer>
            </Modal.Dialog>
            </Modal>
      </div>


      // end of where I should add modals
      </div>
    );
  }

  changeGroup(newGroupId){
    console.log(newGroupId);
    const newGroup = this.state.listOfGroups.filter((group)=>(newGroupId===group.id))[0];
    this.loadJSONData(newGroupId);

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

}
