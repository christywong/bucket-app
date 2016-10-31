import React from 'react';
import Bucket from './buckets/Buckets';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';
import Sidebar2 from './utilities/Sidebar2';
import Cards from './buckets/Cards';

export default class Component extends React.Component {
  constructor(props){
    super(props);

    //Hard code our state for now
    this.state = {
      showModal : false,
      bucketCategories: [{id: 0, title: "My Bucket", commentCount: 1, comments: [{ id: '1', author: "Phill", text: "I like this place!"}]}],
      bucketCount: 0,
      currentUser: 'Alok'
    }

    //Bind our functions to the current scope
    this.createBucket = this.createBucket.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.postComment = this.postComment.bind(this);
  }
  render() {
    const cardArray = this.props.bucketCards;
    let closeModal = () => this.setState({ showModal: false });
    return (
      <div>

      <Sidebar2
        bucketList = {this.props.bucketList}
        changeStateBucket={this.props.changeStateBucket}/>

      <div className="main-container">
        {this.state.showModal ? <AddModal close = {this.closeModal} addBucket = {this.createBucket}/> : null}
        <Grid>
          <Row>
            { cardArray.map((cardEntry) => { return(
              <Col key = {cardEntry.id.toString()} lg={4} md={6}>
                <Cards
                  cardTitle={cardEntry.title}
                  />
              </Col> )})}
          </Row>
        </Grid>
        <div className='add-btn' onClick = {this.showModal}>+</div>
      </div>
      </div>
    )
  }

  //Functions for Buckets and stuff
  createBucket(bucketTitle){
    const bucketCount = this.state.bucketCount + 1;
    const title = bucketTitle.slice(0,1).toUpperCase() + bucketTitle.slice(1,bucketTitle.length);
    this.setState({
        bucketCategories: [
          ...this.state.bucketCategories,
          {id: bucketCount, title: title, commentCount: 0, comments: []}],
          bucketCount: bucketCount,
          showModal:false})
  }

  postComment(comment, bucketId){
    console.log('comment ', comment);
    console.log('bucket id', bucketId);

    var newComment = {
      author: this.state.currentUser,
      text: comment
    }

    const stateWithComment = this.state.bucketCategories.map((bucket)=>{
      console.log('bucket', bucket);
      if(bucket.id === bucketId){
        var newCount = bucket.commentCount+1;
        newComment.id = newCount;
        bucket.commentCount = newCount;
        bucket.comments = [...bucket.comments, newComment]
      }
      return bucket;
    });

    console.log(stateWithComment);
    this.setState({
      bucketCategories: stateWithComment
    });
  }

  showModal(){
    this.setState({showModal: true})
  }
  closeModal(){
    console.log('closing modal');
    this.setState({showModal:false});
  }
}
  // <!--{this.state.showModal ? <AddModal close = {this.closeModal} addBucket = {this.createBucket}/> : null}-->
