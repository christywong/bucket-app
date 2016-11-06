import React from 'react';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar from './utilities/Sidebar';
import Cards from './buckets/Cards';
import uuid from 'uuid';
import update from 'react-addons-update';
var Menu = require('react-burger-menu').push;
import Bucket from './buckets/Buckets';

export default class Component extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showModal : false,
      bucketList: [],
      buckets: [],
      filteredCards: {},
      currentBucketId: 0,
      currentGroupId: 0,
      showSettingsModal: false
    }

    //Bind our functions to the current scope
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeState = this.changeState.bind(this);
    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);
  }

  //Initialize the Main component on start or whenever this component recieves props
  componentWillMount(){
    this.initializeBucket(this.props.currentGroupData);
  }
  componentWillReceiveProps(nextProps){
    this.initializeBucket(nextProps);
  }

  render() {

    //Filter our cards with the specific group tag
    const selectedBucket = this.state.allCards;
    const cardArray = selectedBucket ? this.filterTags(this.state.currentBucketId) : null;

    //Card components to get injected into our view
    const groupCards =  cardArray ? cardArray.map((cardEntry) => { return(
        <Cards
          key = {cardEntry.id.toString()}
          activities = {cardEntry}
          moveCard={this.moveCard}
          bucketTags = {this.state.bucketList}
          deleteCard={this.deleteCard}
          />
      )}) : null;

    return (
      <div id="outer-container">
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
          {this.state.bucketList.map ( (bucket) => { return(
            <Bucket
              changeStateBucket = {this.changeState}
              key = {bucket.id}
              bucketId = {bucket.id}
              bucketName = {bucket.title}
              active = {this.state.currentBucketId === bucket.id ? "active" : null} />
          )})}
        </Menu>
        <Sidebar
          selectedBucket = {this.state.currentBucketId}
          bucketList = {this.state.bucketList}
          changeStateBucket = {this.changeState}
        />

        <div className="main-container" id="page-wrap">
          {
            this.state.showModal ?
            <AddModal
              addCard = {this.addCard}
              close = {this.closeModal}
              addBucket = {this.createBucket}
              bucketTags = {this.state.bucketList}
              />
            : null
          }

          {groupCards}

          {
            this.state.showSettingsModal ?
            <AccountSettingsModal close={this.closeAccountSettingsModal} />
            : null
          }

          <div
            className='add-btn'
            onClick = {this.showModal}>+</div>
        </div>
      </div>
    )
  }

  // Listener to change the state of our modal
  showModal(){
    this.setState({showModal: true})
  }

  closeModal(){
    this.setState({showModal:false});
  }

  showAccountSettingsModal(){
    this.setState({showModal: true});
  }

  closeAccountSettingsModal(){
    this.setState({showModal: false});
  }

  // Filter the cards by the selected Tags
  filterTags(bucketId){
    const bucketArray = this.state.allCards ? this.state.allCards : [];
    const nextBucket = bucketId !== 0 ? bucketArray.filter((bucket)=>(bucket.tags[0] == bucketId)) : bucketArray;
    return nextBucket;
  }

  //Listener to change the state of which cards are selected
  changeState(bucketId) {
    const changeBucket = this.filterTags(bucketId);
    this.setState({
      filteredCards: changeBucket,
      currentBucketId: bucketId
    });
  }

  //Creates a card and adds it to the specified bucket
  addCard(card, bucketId){

    //Build the new Card we want to Add
    const newCard = {
      id: uuid.v4(),
      yelpId: card.id,
      img: card.image_url,
      rating: card.rating_img_url,
      city: card.location.city,
      reviewCount: card.review_count,
      title: card.name,
      tags: [bucketId]
    }

    const currentBucketId = this.state.currentBucketId;
    const currentBucket = this.state.buckets.cards;
    const updatedGroup = update(this.state.buckets, {cards: {$push: [newCard]}});
    const selectedBucket = bucketId === currentBucketId || currentBucketId === 0 ? update(this.state.filteredCards, {cards: {$push: [newCard]}}) : this.state.filteredCards;

    //Add cards to the state in APP
    //TODO Remove when we get our Rest API up

    //this.props.addCardToGroup(newCard, this.state.currentGroupId, this.state.currentBucketId);
    this.setState({
      buckets: updatedGroup,
      filteredCards: selectedBucket
    });
  }

  // Moves a card to the specified bucket
  moveCard(card, newTag){
    card.tags[0] = newTag;
    var nextSelectedState ={};
    const currentBucketId = this.state.currentBucketId
    const newCard = card;
    const nextState = this.state.allCards.map((oldCard) => {
      if(oldCard === card.id){
        return card;
      }
      else{
        return oldCard;
      }
    });

    if(newTag !== this.state.currentBucketId && this.state.currentBucketId != 0){
      nextSelectedState = this.state.filteredCards.filter((oldCard)=>(oldCard.id !== card.id));
    }
    else{
      nextSelectedState = this.state.filteredCards;
    }

    // TODO Add a Move Card API call when we get our Rest API up
    this.setState({
      buckets: update(this.state.buckets, {cards: {$set: nextState}}),
      filteredCards: nextSelectedState
    });
  }

  // Deletes a card
  deleteCard(cardId){
    console.log('deleting ', cardId);
    const filteredCardsNextState = this.state.filteredCards.filter((oldCard)=>(oldCard.id!==cardId));
    const cardsNextState = this.state.allCards.filter((oldCard)=>(oldCard.id!==cardId));

    // TODO Add a delete Card API call when we get our Rest API up
    this.setState({
      allCards: cardsNextState, //: update(this.state.buckets, {cards: {$set: bucketNextState}}),
      filteredCards: filteredCardsNextState
    })
  }

  //Initialize our State whenever we update a prop from App.
  //This will keep the Main Component updated with whatever changes were made to App
  initializeBucket(buckets){

    const currentBucket = buckets.currentGroupData;
    const selected = currentBucket ? currentBucket.activities : null;
    const listOfBuckets = currentBucket ? currentBucket.tags : []
    const currentGroup = currentBucket ? currentBucket.id : 0;

    this.setState({
      bucketList      : listOfBuckets,
      filteredCards   : selected,
      allCards        : selected,
      currentGroupId  : currentGroup,
      currentBucketId : buckets.currentBucketId
    });
  }

}
