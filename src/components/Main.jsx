import React from 'react';
import Bucket from './buckets/Buckets';
import AddModal from './utilities/AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';

export default class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal : false,
      bucketCategories: [{id: 0, title: "My Bucket", comments: [{ id: '0', author: "Daniel", text: "I like this place!"}, { id: '1', author: "Phil", text: "Me Too"}, { id: '2', author: "Daniel", text: "Let's go again"}]}],
      bucketCount: 0
    }

    this.createBucket = this.createBucket.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  render() {
    const bucketArray = this.state.bucketCategories;
    let closeModal = () => this.setState({ showModal: false });
    return (
      <div className="main-container">
        {this.state.showModal ? <AddModal close = {this.closeModal} addBucket = {this.createBucket}/> : null}
        <Grid>
          <Row>
            {
              bucketArray.map((bucketEntry) => {
                return(
                  <Col key = {bucketEntry.id.toString()} lg={4} md={6}>
                    <Bucket cardTitle={bucketEntry.title} commentList={bucketEntry.comments}/>
                  </Col>)
              })
            }
          </Row>
        </Grid>
        <div className='add-btn' onClick = {this.showModal}>+</div>
      </div>
    )
  }

  createBucket(bucketTitle){
    const bucketCount = this.state.bucketCount + 1;
    const title = bucketTitle.slice(0,1).toUpperCase() + bucketTitle.slice(1,bucketTitle.length);
    this.setState(
      {
        bucketCategories: [
          ...this.state.bucketCategories,
          {id: bucketCount, title: title}],
          bucketCount: bucketCount,
          showModal:false
      }
    )
  }

  showModal(){
    this.setState({showModal: true})
  }
  closeModal(){
    console.log('closing modal');
    this.setState({showModal:false});
  }
}
