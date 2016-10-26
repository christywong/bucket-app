import React from 'react';
import Bucket from './Buckets';
import AddModal from './AddBucketModal';
import {Grid, Row, Col} from 'react-bootstrap';

export default class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addBucketModal : false,
      bucketCategories: [{id: 0, title: "My Bucket", comments: [{ author: "", text: ""}]}],
      bucketCount: 0
    }

    this.createBucket = this.createBucket.bind(this);
  }
  render() {
    const bucketArray = this.state.bucketCategories;
    let closeModal = () => this.setState({ addBucketModal: false });
    return (
      <div className="main-container">
        <Grid>
          <Row>
            {
              bucketArray.map((bucketEntry) => {
                return(
                  <Col key = {bucketEntry.id.toString()} lg={4} md={6}>
                    <Bucket cardTitle={bucketEntry.title}/>
                  </Col>)
              })
            }
          </Row>
        </Grid>
        <div className='add-btn' onClick = {this.createBucket}>+</div>
      </div>
    )
  }

  createBucket(){
    const bucketCount = this.state.bucketCount + 1;

    this.setState(
      {
        bucketCategories: [
          ...this.state.bucketCategories,
          {id: bucketCount, title: 'New bucket ' + bucketCount}],
          bucketCount: bucketCount,
          addBucketModal: true
      }
    )
  }
}
