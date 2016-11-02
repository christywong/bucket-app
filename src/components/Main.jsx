import React from 'react';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar from './utilities/Sidebar';
import Cards from './buckets/Cards';
import uuid from 'uuid';

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
  }

  componentWillMount(){
    this.initializeBucket(this.props.currentGroup.buckets);
  }

  componentWillReceiveProps(nextProps){
    this.initializeBucket(nextProps.currentGroup.buckets);
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
          {this.state.showModal ? <AddModal addCard = {this.addCard} close = {this.closeModal} addBucket = {this.createBucket}/> : null}
              { cardArray.map((cardEntry) => { return(
                  <Cards
                    key = {cardEntry.id.toString()}
                    cardTitle={cardEntry.title}
                    img = {cardEntry.img}
                    rating= {cardEntry.rating}
                    reviewCount={cardEntry.reviewCount}
                    city={cardEntry.city}
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
    const bucketArray = this.state.buckets;
    for(var i = 0; i < bucketArray.length; i++) {
      if (bucketArray[i].id == bucketId) {
        this.setState({
          selectedBucket: bucketArray[i]
        });
        break;
      }
    }
  }

  addCard(cardName, bucketId){
    let newCard = {
      id: uuid.v4(),
      title: cardName
    }
    const bucketArray = this.state.buckets;
    const bucketWithNewCard = bucketArray.map((bucket)=>{
      if(bucket.id === bucketId){
        bucket.cards = [...bucket.cards, newCard];

      }
    return bucket;

    });
    this.setState({
      buckets: bucketWithNewCard
    });
  }

  initializeBucket(buckets){
    const listOfBuckets = buckets.map((bucket) => (
      {id: bucket["id"], title: bucket["title"]}));
    const selectedBucket = buckets.filter((bucket) => (bucket.id === 0))[0];
    const selected = selectedBucket ? selectedBucket : {cards:[]}

    this.setState({
      bucketList: listOfBuckets,
      buckets: buckets,
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
