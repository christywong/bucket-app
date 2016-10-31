import React from 'react';
import CardEntry from './SearchEntry';
import { Button } from 'react-bootstrap';
import Bucket from '../buckets/Buckets2.jsx';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
  }

  render(){
    var list = this.props.bucketList;
    console.log(list);
    return(
      <div className='sidebar'>
        {list.map ( (bucket) => { return( 
          <Bucket changeStateBucket={this.props.changeStateBucket} 
            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null} />)})}
        <button type="button" id="create-bucket-button">Create New Bucket</button>
      </div>
    );
  }
  
}
