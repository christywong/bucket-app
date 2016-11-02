import React from 'react';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar from './utilities/Sidebar';
import Cards from './buckets/Cards';
import uuid from 'uuid';
import update from 'react-addons-update';

export default class Component extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showModal : false,
      bucketList: [],
      buckets: [],
      selectedBucket: {}
    }

    //Bind our functions to the current scope
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeState = this.changeState.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addBucket = this.addBucket.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  componentWillMount(){
    this.initializeBucket(this.props.currentGroup.buckets);
  }

  componentWillReceiveProps(nextProps){
    this.initializeBucket(nextProps.currentGroup);
  }

  render() {
    const cardArray = this.state.selectedBucket.cards;
    const selectedBucketId = this.state.selectedBucket.id;
    let closeModal = () => this.setState({ showModal: false });

    return (
      <div>
        <Sidebar
          selectedBucket = {selectedBucketId}
          bucketList = {this.state.bucketList}
          changeStateBucket = {this.changeState}
          addBucket = {this.addBucket} />

        <div className="main-container">
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

              { cardArray.map((cardEntry) => { return(
                  <Cards
                    key = {cardEntry.id.toString()}
                    activities = {cardEntry}
                    moveCard={this.moveCard}
                    bucketTags = {this.state.bucketList}
                    />
              )})}
          <div className='add-btn' onClick = {this.showModal}>+</div>
        </div>
      </div>
    )
  }

  //Functions for Buckets and stuff
  showModal(){
    this.setState({showModal: true})
  }

  closeModal(){
    this.setState({showModal:false});
  }

  changeState(bucketId) {
    const bucketArray = this.state.buckets.cards;
    const nextBucket = bucketId !== 0 ? bucketArray.filter((bucket)=>(bucket.tags[0] == bucketId)) : bucketArray;


    const changeBucket = {
      cards: nextBucket
    }


    this.setState({
      selectedBucket: changeBucket
    });
  }

  addCard(card, bucketId){
    const newCard = {
      id: uuid.v4(),
      yelpId: card.id,
      img: card.image_url,
      rating: card.rating_img_url,
      city: card.location.city,
      reviewCount: card.review_count,
      title: card.name
    }

    const bucketWithNewCard = [...this.state.selectedBucket.cards, newCard];
    const updatedGroup = this.state.buckets.map((bucket)=>{
      if(bucket.id === bucketId){
        bucket.cards = [...bucket.cards, newCard];
      }
    return bucket;
    });

    this.setState({
      buckets: updatedGroup
    });
  }

  moveCard(card, nextBucket){
    console.log('moving card ', card , ' to bucket ', nextBucket);
    console.log(this.state.buckets[nextBucket]);
    var newCard = update(this.state.buckets[nextBucket],{cards:{$push: [card]}});
    var currentBucket = this.state.selectedBucket.id;

    const nextSelectedBucketState = this.state.selectedBucket.cards.filter((currentCard)=>(currentCard.id !== card.id));

    const nextBucketState = this.state.buckets.map((bucket)=>{
      if(bucket.id === nextBucket){
        return newCard;
      }
      if(bucket.id === currentBucket){
        bucket.cards = nextSelectedBucketState;
      }
      return bucket;
    });

    console.log('new card ', nextSelectedBucketState);

    this.setState({
      buckets: nextBucketState,
      selectedBucket: update(this.state.selectedBucket, {cards: {$set: nextSelectedBucketState}})
    });
  }

  initializeBucket(buckets){
    console.log('initializing buckets ', buckets);
    // const listOfBuckets = buckets.map((bucket) => (
    //   {id: bucket["id"], title: bucket["title"]}));
    //
    // const selectedBucket = buckets.filter((bucket) => (bucket.id === 0))[0];
    const selected = buckets.buckets ? buckets.buckets : {cards:[]}
    const listOfBuckets = buckets.tags ? buckets.tags : []

    this.setState({
      bucketList: listOfBuckets,
      buckets: buckets.buckets,
      selectedBucket: selected
    });
  }

  addBucket(name) {
    if (name != "") {
      var newBucket = [...this.state.bucketList, {id: uuid.v4(), title: name}];
      this.setState({
        bucketList: newBucket
      });
    }
  }

}
