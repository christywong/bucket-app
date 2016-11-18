import React from 'react';
import AddModal from './modals/AddCardModal';
import {Grid, Row, Col, Popover, OverlayTrigger, Button} from 'react-bootstrap';
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
      filteredCards: {},
      currentBucketId: 0,
      currentGroupId: 0,
      showSettingsModal: false,
      newBucket: '',
      showAddModal: false
    }

    //Bind our functions to the current scope
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeState = this.changeState.bind(this);
    this.moveCard = this.moveCard.bind(this);
    //this.deleteCard = this.deleteCard.bind(this);
    this.handleDeleteBucket = this.handleDeleteBucket.bind(this);


    //Bind modal listeners
    this.showAccountSettingsModal = this.showAccountSettingsModal.bind(this);
    this.closeAccountSettingsModal = this.closeAccountSettingsModal.bind(this);
  }

  //Initialize the Main component on start or whenever this component recieves props
  componentWillMount(){
    this.initializeBucket(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.initializeBucket(nextProps);
  }

  // Handler for deleting a bucket
  handleDeleteBucket() {
    this.props.deleteBucket(this.state.currentBucketId);
  }

  render() {

    //Filter our cards with the specific group tag
    const selectedBucket = this.state.allCards;
    const cardArray = selectedBucket ? this.filterTags(this.state.currentBucketId) : null;

    //Card components to get injected into our view
    const filteredCards =  cardArray ? cardArray.map((cardEntry) => { return(
      <Cards
        key = {cardEntry.id.toString()}
        activities = {cardEntry}
        moveCard={this.moveCard}
        bucketTags = {this.state.bucketList}
        deleteCard={this.props.deleteCard}
        tags = {this.props.allGroups}
        />
    )}) : [];

    const groupCards = filteredCards.length > 0 ? filteredCards : (
      <h2 className="empty-bucket-msg"> There are no cards in this bucket :( </h2>
    );

    // Popover for deleting buckets
    const deletePopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Are you sure?">
        <Button
          bsStyle="danger"
          bsSize="small"
          onClick = {()=>{
            this.handleDeleteBucket();
            this.refs.deleteOverlay.hide();
          }}>Yes</Button>
          <Button
            style={{float:"right"}}
            bsSize="small"
            onClick = {()=>{
              this.refs.deleteOverlay.hide();
            }}>No</Button>
          </Popover>
        );
        const list = this.state.bucketList ? this.state.bucketList : [];
        var createdBuckets = list.filter((bucket)=>(bucket.typeOfBucket !== 1 && bucket.typeOfBucket !== 2));
        var allBucket = list.filter((bucket)=>(bucket.typeOfBucket === 1))[0];
        var archiveBucket = list.filter((bucket)=>(bucket.typeOfBucket === 2))[0];

        return (
          <div id="outer-container">
            <Menu
              pageWrapId={ "page-wrap" }
              outerContainerId={ "outer-container" } >
              <h3 className="tags-title">Tags
                <i
                className="fa fa-plus-square"
                id="create-bucket-button"
                onClick={this.props.showBucketModal} /> </h3>
              {
                allBucket ?
                <Bucket
                  changeStateBucket = {this.changeState}
                  key = {allBucket.id}
                  bucketId = {allBucket.id}
                  bucketName = {allBucket.title}
                  active = {this.state.currentBucketId === allBucket.id ? "active" : null}
                  />
                : null
              }

              {createdBuckets.map ( (bucket) => { return(
                <Bucket
                  changeStateBucket = {this.changeState}
                  key = {bucket.id}
                  bucketId = {bucket.id}
                  bucketName = {bucket.title}
                  active = {this.state.currentBucketId === bucket.id ? "active" : null}
                  showDeleteIcon = {this.state.currentBucketId === bucket.id && bucket.typeOfBucket !== 1 && bucket.typeOfBucket !== 2 ? (
                    <OverlayTrigger
                      ref="deleteOverlay"
                      trigger="click"
                      rootClose
                      placement="top"
                      overlay={deletePopover}>
                      <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        id="delete-bucket-icon">
                      </i>
                    </OverlayTrigger>
                  ) : null} />
                )})}

                {
                  archiveBucket ?
                  <Bucket
                    changeStateBucket = {this.changeState}
                    key = {archiveBucket.id}
                    bucketId = {archiveBucket.id}
                    bucketName = {archiveBucket.title}
                    active = {this.state.currentBucketId === archiveBucket.id ? "active" : null}
                    />
                  : null
                }
              </Menu>

              <Sidebar
                selectedBucket = {this.state.currentBucketId}
                bucketList = {this.state.bucketList}
                changeStateBucket = {this.changeState}
                addBucket = {this.props.addBucket}
                currentGroup = {this.props.currentGroup}
                deleteBucket = {this.props.deleteBucket}
                showBucketModal = {this.props.showBucketModal}
                />

              <div className="main-container" id="page-wrap">
                {
                  this.state.showModal ?
                  <AddModal
                    addCard = {this.props.addCard}
                    close = {this.closeModal}
                    addBucket = {this.createBucket}
                    bucketTags = {this.state.bucketList}
                    visibility={this.state.showModal}
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
                  className='mybucket-btn'
                  onClick = {()=>{this.props.changeMyBucket()}} >
                  <i className="fa fa-home" aria-hidden="true"></i>
                </div>
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

        /**
        * Filter the cards by the selected Tags
        * @param bucketId - The id of the bucket that will filter the cards.
        */
        filterTags(bucketId){
          const bucketArray = this.state.allCards ? this.state.allCards : [];
          const nextBucket = bucketId !== "0" ? bucketArray.filter((bucket)=>(bucket.tags[0] == bucketId)) : bucketArray;
          return nextBucket;
        }

        /**
        * Changes the state of the cards based on which bucket is selected.
        * @param {number} bucketId - The id of the bucket that is to be selected.
        */
        changeState(bucketId) {
          const changeBucket = this.filterTags(bucketId);
          this.setState({
            filteredCards: changeBucket,
            currentBucketId: bucketId
          });
          this.props.changeSelected(bucketId);
        }

        /**
        * Moves a card to a new bucket.
        * @param {object} card - The selected card that we want to move
        * @param {Number} newTag - The new bucket that we want to move the card too
        */
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

          //Want to filter out the card we are moving from the old view
          if(newTag !== this.state.currentBucketId && this.state.currentBucketId != "0"){
            nextSelectedState = this.state.filteredCards.filter((oldCard)=>(oldCard.id !== card.id));
          }
          else{
            nextSelectedState = this.state.filteredCards;
          }

          //make a call to our api
          this.apiMoveCard(card.id, this.state.currentGroupId, newTag);
          const nextAllCardsState = update(this.state, {allCards: {$set: nextState}});
          //set our new state
          this.setState({
            allCards: nextAllCardsState.allCards,
            filteredCards: nextSelectedState
          });
        }

        // /**
        // * Deletes a card from a group.
        // * @param {Number} cardId - The id of the card that we want to remove.
        // */
        // deleteCard(cardId){
        //   const filteredCardsNextState = this.state.filteredCards.filter((oldCard)=>(oldCard.id!==cardId));
        //   const cardsNextState = this.state.allCards.filter((oldCard)=>(oldCard.id!==cardId));
        //
        //   //make a call to our api
        //   this.apiDeleteCard(cardId, this.state.currentGroupId);
        //
        //   //set our new state
        //   this.setState({
        //     allCards: cardsNextState, //: update(this.state.buckets, {cards: {$set: bucketNextState}}),
        //     filteredCards: filteredCardsNextState
        //   })
        // }

        //Initialize our State whenever we update a prop from App.
        //This will keep the Main Component updated with whatever changes were made to App
        initializeBucket(buckets){
          console.log('...initializing bucking ', buckets);
          const currentBucket = buckets.currentGroupData;
          const selected = currentBucket ? currentBucket.activities : null;
          const listOfBuckets = currentBucket ? currentBucket.tags : [];
          const currentGroup = currentBucket ? currentBucket._id : 0;
          this.filterTags(buckets.currentGroupId);
          console.log('all cards ', selected);
          //set our state initially
          this.setState({
            bucketList      : listOfBuckets,
            filteredCards   : selected,
            allCards        : selected,
            currentGroupId  : currentGroup,
            currentBucketId : buckets.currentBucketId,
          });
        }

        // API CALLS
        // apiDeleteCard(cardId, groupId){
        //   var me = this;
        //   var xhr = new XMLHttpRequest();
        //   var payload = 'cardId=' + cardId + '&groupId=' + groupId;
        //
        //   xhr.onreadystatechange = function(){
        //     if(xhr.readystate === 4){
        //       if(xhr.status === 200){
        //         console.log('success!');
        //       } else{
        //         console.log('oops there was an error');
        //       }
        //     }
        //   }
        //
        //   xhr.open('DELETE', '/api/deleteCard');
        //   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        //   xhr.send(payload);
        // }

        apiMoveCard(cardId,groupId, newTag){
          var me = this;
          var xhr = new XMLHttpRequest();
          var payload = 'cardId=' + cardId + '&groupId=' + groupId + '&tags=' + newTag;

          xhr.onreadystatechange = function(){
            if(xhr.readystate === 4){
              if(xhr.status === 200){
                console.log('success!');
              } else{
                console.log('oops there was an error');
              }
            }
          }

          xhr.open('PUT', '/api/moveCard');
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send(payload);
        }

      }
