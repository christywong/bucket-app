import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar  from './utilities//Navbar';
import Sidebar from './utilities/Sidebar';
import Main from './Main';
import uuid from 'uuid';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal : false,
      buckets: [
        {id: 0, title: "My Bucket", cards:[{id: uuid.v4(), title: "a"}, {id: uuid.v4(), title: "b"}, {id: uuid.v4(), title: "c"}]},
        {id: 1, title: 'Brunch', cards:[{id: uuid.v4(), title: "Cottage"}, {id: uuid.v4(), title: "Cody's La Jolla"}, {id: uuid.v4(), title: "Snooze"}]},
        {id: 2, title: 'Hiking', cards:[{id: uuid.v4(), title: "Gliderport"}, {id: uuid.v4(), title: "Potato Chip"}]}],
      bucketList: [
        {id: 0, title: "My Bucket"},
        {id: 1, title: "Brunch"},
        {id: 2, title: "Hiking"}
      ],
      groups: [
        {id: 0, dropdownid: 1.1, title: "Group 1", link: "app.html", members: ["christy", "joey"]},
        {id: 1, dropdownid: 1.2, title: "Group 2", link: "app.html", members: ["daniel"]}
      ],
      selectedBucket: {id: 0, title: "My Bucket", cards:[{id: 0, title: "a"}, {id: 1, title: "b"}, {id: 2, title: "c"}]}
    }
    this.changeState = this.changeState.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  render(){
    return (
      <div>
        <Navbar groups={this.state.groups} />
        <Main
          addCard ={this.addCard}
          selectedBucket = {this.state.selectedBucket.id}
          changeStateBucket = {this.changeState}
          bucketList = {this.state.bucketList}
          bucketName = {this.state.selectedBucket.title}
          bucketCards = {this.state.selectedBucket.cards} />
      </div>
    );
  }

  addCard(cardName, bucketId){
    let newCard = {
      id: uuid.v4(),
      title: cardName
    }
    console.log(cardName, bucketId);
    const bucketArray = this.state.buckets;
    const bucketWithNewCard = bucketArray.map((bucket)=>{
      if(bucket.id === bucketId){
        bucket.cards = [...bucket.cards, newCard];

      }
    return bucket;

    });

    this.setState({
      buckets: bucketWithNewCard
    })

    console.log(bucketWithNewCard);

  }

  changeState(bucketId) {
    console.log(this.state);
    var bucketArray = this.state.buckets;
    for(var i = 0; i < bucketArray.length; i++) {
      console.log('bucket id of undefined' + bucketArray[i] + ' at ' + i);
      if (bucketArray[i].id == bucketId) {
        this.setState({
          selectedBucket: bucketArray[i]
        });
        break;
      }
    }
  }
}
