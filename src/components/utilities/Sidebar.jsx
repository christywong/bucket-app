import React from 'react';
import CardEntry from './SearchEntry';
import Bucket from '../buckets/Buckets.jsx';
import { Button } from 'react-bootstrap';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      value: '',
      newBucket: 'one'
    };

    this.handleSubmitBucket = this.handleSubmitBucket.bind(this);
    this.handleDeleteBucket = this.handleDeleteBucket.bind(this);
  }

  handleSubmitBucket() {
    this.props.addBucket(this.state.newBucket, this.props.currentGroup);
  }

  handleDeleteBucket() {
    this.props.deleteBucket(this.props.selectedBucket);
  }

  render(){
    var list = this.props.bucketList;
    return(
      <div className='sidebar'>
        <Button id="create-bucket-button" onClick={this.handleSubmitBucket}>Create a Bucket</Button>
        {list.map ( (bucket) => { return(
          <Bucket changeStateBucket = {this.props.changeStateBucket}
            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null}
            showDeleteIcon = {this.props.selectedBucket === bucket.id ? (<i className="fa fa-trash-o" aria-hidden="true" id="delete-bucket-icon" onClick={this.handleDeleteBucket}></i>) : null} />
        )})}
      </div>
    );
  }
}
