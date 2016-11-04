import React from 'react';
import CardEntry from './SearchEntry';
import Bucket from '../buckets/Buckets.jsx';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      value: ''
    };
  }
  render(){
    var list = this.props.bucketList;
    return(
      <div className='sidebar'>
        {list.map ( (bucket) => { return(
          <Bucket changeStateBucket = {this.props.changeStateBucket}
            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null} />
        )})}
      </div>
    );
  }
}
