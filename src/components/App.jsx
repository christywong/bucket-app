import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar  from './utilities//Navbar';
import Sidebar from './utilities/Sidebar';
import Main from './Main';
import Sidebar2 from './utilities/Sidebar2';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal : false,
      buckets: [
        {id: 0, title: "My Bucket", cards:[{id: 0, title: "a"}, {id: 1, title: "b"}, {id: 2, title: "3"}]},
        {id: 1, title: 'Brunch', cards:[{id: 0, title: "Cottage"}, {id: 1, title: "Cody's La Jolla"}, {id: 2, title: "Snooze"}]},
        {id: 2, title: 'Hiking', cards:[{id: 0, title: "Gliderport"}, {id: 1, title: "Potato Chip"}]}],
      bucketList: [
        {id: 0, title: "My Bucket"},
        {id: 1, title: "Brunch"},
        {id: 2, title: "Hiking"}
      ],
      selectedBucket: {title: "Current", cards:[{id: 0, title: "1"}, {id: 1, title: "2"}]}
    }
    this.changeState = this.changeState.bind(this);
  }

  render(){
    return (
      <div>
        <Navbar />
        <Main
          changeStateBucket={this.changeState}
          bucketList = {this.state.bucketList}
          bucketName={this.state.selectedBucket.title}
          bucketCards={this.state.selectedBucket.cards} />
      </div>
    );
  }

  changeState(bucketId) {
    console.log(bucketId);
    var bucketArray = this.state.buckets;
    for(var i=0; i < bucketArray.length; i++) {
      if (bucketArray[i].id == bucketId) {
        this.setState({
          selectedBucket: bucketArray[i]
        });
        break;
      }
    }
  }
}
