import React from 'react';
var styles = require("../static/styles/main.scss");
import uuid from 'uuid';
import App from './App';

export default class BucketPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      groups: [{
        id: 0,
        title: "Group 1",
        members: ["christy", "joey"],
        buckets: [
          {id: 0, title: "My Bucket", cards:[{id: uuid.v4(), title: "a"}, {id: uuid.v4(), title: "b"}, {id: uuid.v4(), title: "c"}]},
          {id: 1, title: 'Brunch', cards:[{id: uuid.v4(), title: "Cottage"}, {id: uuid.v4(), title: "Cody's La Jolla"}, {id: uuid.v4(), title: "Snooze"}]},
          {id: 2, title: 'Hiking', cards:[{id: uuid.v4(), title: "Gliderport"}, {id: uuid.v4(), title: "Potato Chip"}]}],
        },
        {
          id: 1,
          title: "Group 2",
          members: ["daniel"]
        }],
        currentGroup: {id: 0, title: "Group 1"}
      }

    }

    render(){
      const currentGroup = this.getCurrentGroup(this.state.currentGroup.id);
      console.log('currentGroup ',currentGroup);
      return (
        <App currentGroup = {currentGroup}/>
      );
    }

    getCurrentGroup(currentGroupId){
      return this.state.groups.filter((group) => (currentGroupId === group.id))[0];
    }
  }
