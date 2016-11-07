import React from 'react';
var styles = require("../static/styles/main.scss");
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';
import AccountSettingsModal from './utilities/AccountSettingsModal';
import {Modal,Button} from "react-bootstrap";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {
      },
      showModal: false,
      showModal2: false,
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
let close = () => this.setState({ showModal2: false});
    return (

      <div>
        <NavbarInstance
          currentGroup ={this.state.data}
          groups = {this.state.data.tags}
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
          addCardToGroup = {this.addCardToGroup}
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

  loadJSONData(){
    console.log('loading data');
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          //set application state here
          var result = xhr.response[0];
          // var selectedGroup = result.groups;
          // result.currentGroup = selectedGroup;
          console.log('result is ', result);

          me.setState({
            data: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
    console.log('getting data from server');
    xhr.open('GET', '/api/getGroup/' + this.state.currentBucket);
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
