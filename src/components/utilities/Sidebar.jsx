import React from 'react';
import CardEntry from './SearchEntry';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import Bucket from '../buckets/Buckets.jsx';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      value: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    this.setState({target: e.target, show: !this.state.show});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    //this.setState({show: false});
    this.refs.overlay.hide();
    this.props.addBucket(this.state.value);
    this.setState({value: ''});
  }

  render(){
    var list = this.props.bucketList;
    console.log("selected bucket: ", this.props.selectedBucket);
    const createBucketPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Create Bucket">
        <input
          type="text"
          id="bucket-name-input"
          placeholder="Bucket Name"
          onChange={this.handleChange}>
        </input>
        <input
          type="submit"
          id="submit-new-bucket"
          value="Create"
          onClick={this.handleSubmit}>
        </input>
      </Popover>
    )

    return(
      <div className='sidebar'>
        {list.map ( (bucket) => { return(
          <Bucket changeStateBucket = {this.props.changeStateBucket}

            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null} />
        )})}
        <ButtonToolbar>
          <OverlayTrigger ref="overlay" trigger="click" rootClose placement="top" overlay={createBucketPopover}>
            <Button onClick={this.handleClick} id="create-bucket-button">
              Create New Bucket
            </Button>
          </OverlayTrigger>
        </ButtonToolbar>
      </div>
    );
  }
}
