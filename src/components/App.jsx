import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar  from './utilities//Navbar';
import Main from './Main';
import uuid from 'uuid';

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      groups: [
      {id: 0,
        title:"My Bucket",
        members: ["joey"],
        buckets: [
          {id: 0, title: "All Buckets", cards:[{id: uuid.v4(), title: "Vallartas"}, {id: uuid.v4(), title: "Phil's BBQ"}, {id: uuid.v4(), title: "Barona"}]},
          {id: 1, title: 'Brunch', cards:[{id: uuid.v4(), title: "Cottage"}, {id: uuid.v4(), title: "Cody's La Jolla"}, {id: uuid.v4(), title: "Snooze"}]},
          {id: 2, title: 'Hiking', cards:[{id: uuid.v4(), title: "Gliderport"}, {id: uuid.v4(), title: "Potato Chip"}]},
          {id: 3, title: 'Archive', cards:[{id: uuid.v4(), title: "Gliderport"}, {id: uuid.v4(), title: "Potato Chip"}]}]
      },
      {
        id: 1,
        title: "Group 1",
        members: ["christy", "joey"],
        buckets: [
          {id: 0, title: "My Bucket", cards:[{id: uuid.v4(), title: "Vallartas"}, {id: uuid.v4(), title: "Phil's BBQ"}, {id: uuid.v4(), title: "Barona"}]},
          {id: 1, title: 'Brunch', cards:[{id: uuid.v4(), title: "Cottage"}, {id: uuid.v4(), title: "Cody's La Jolla"}, {id: uuid.v4(), title: "Snooze"}]},
          {id: 2, title: 'Hiking', cards:[{id: uuid.v4(), title: "Gliderport"}, {id: uuid.v4(), title: "Potato Chip"}]}],
      },
      {
        id: 2,
        title: "Group 2",
        members: ["daniel"]
      }],
    currentGroup: {id: 0}

    }
    this.getCurrentGroup=this.getCurrentGroup.bind(this);
    this.changeGroup=this.changeGroup.bind(this);
  }


  render(){
    const currentGroup = this.getCurrentGroup(this.state.currentGroup.id);
    const groups = this.state.groups.map((group)=>(
      {id: group['id'], title: group['title']}
    ))
    console.log('currentGroup ',currentGroup);
    return (
      <div>
        <Navbar changegroup= {this.changeGroup} groups = {this.state.groups} />
        <Main currentGroup = {currentGroup} />
      </div>
    );
  }

  getCurrentGroup(currentGroupId){
    return this.state.groups.filter((group) => (currentGroupId === group.id))[0];
  }

  changeGroup(currentGroupId){
    console.log("clicked group ", currentGroupId);
    var currentGroupObj={id:currentGroupId}
    this.setState({
      currentGroup:currentGroupObj
    })
  }


}
