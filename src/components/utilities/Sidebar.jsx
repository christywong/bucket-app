import React from 'react';
import CardEntry from './SearchEntry';
import Bucket from '../buckets/Buckets.jsx';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      show: false,
      value: '',
      newBucket: ''
    };

    this.handleDeleteBucket = this.handleDeleteBucket.bind(this);
  }

  handleDeleteBucket() {
    this.props.deleteBucket(this.props.selectedBucket);
  }

  render(){
    const list = this.props.bucketList ? this.props.bucketList : [];
    var createdBuckets = list.filter((bucket)=>(bucket.typeOfBucket !== 1 && bucket.typeOfBucket !== 2));
    var allBucket = list.filter((bucket)=>(bucket.typeOfBucket === 1))[0];
    var archiveBucket = list.filter((bucket)=>(bucket.typeOfBucket === 2))[0];

    console.log('allBucket is: ', allBucket);
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

        return(
          <div className='sidebar'>
            <Button
              id="create-bucket-button"
              onClick={this.props.showBucketModal}>
              Create a Bucket
            </Button>
            {
              allBucket ?
              <Bucket
                changeStateBucket = {this.props.changeStateBucket}
                key = {allBucket.id}
                bucketId = {allBucket.id}
                bucketName = {allBucket.title}
                active = {this.props.selectedBucket === allBucket.id ? "active" : null}
                />
              : null
            }
            {createdBuckets.map ( (bucket) => { return(
              <Bucket
                changeStateBucket = {this.props.changeStateBucket}
                key = {bucket.id}
                bucketId = {bucket.id}
                bucketName = {bucket.title}
                active = {this.props.selectedBucket === bucket.id ? "active" : null}
                showDeleteIcon = {this.props.selectedBucket === bucket.id && bucket.typeOfBucket !== 1 && bucket.typeOfBucket !== 2 ? (
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
                  changeStateBucket = {this.props.changeStateBucket}
                  key = {archiveBucket.id}
                  bucketId = {archiveBucket.id}
                  bucketName = {archiveBucket.title}
                  active = {this.props.selectedBucket === archiveBucket.id ? "active" : null}
                  />
                : null
              }
            </div>
          );
        }
      }
