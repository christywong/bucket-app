import React from 'react';
import CardEntry from './SearchEntry';
import Bucket from '../buckets/Buckets.jsx';
var Menu = require('react-burger-menu').push;

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
      <Menu>
        {list.map ( (bucket) => { return(
          <Bucket changeStateBucket = {this.props.changeStateBucket}
            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null} />
        )})}
      </Menu>
    );
  }
}
