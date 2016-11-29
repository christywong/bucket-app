import React from 'react';
import {Button, Col, OverlayTrigger, Popover} from 'react-bootstrap';

export default class SearchEntry extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    const list = this.props.bucketTags ? this.props.bucketTags : [];
    var createdBuckets = list.filter((bucket)=>(bucket.typeOfBucket !== 1 && bucket.typeOfBucket !== 2));
    var allBucket = list.filter((bucket)=>(bucket.typeOfBucket === 1))[0];
    var archiveBucket = list.filter((bucket)=>(bucket.typeOfBucket === 2))[0];

    const createBucketPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Select a Tag">
        {
          allBucket ? 
          <p
            onClick = {()=>{
              this.refs.selectTagOverlay.hide();
              this.props.addCard(this.props.ItemEntry, allBucket.id);
            }}
            key = {allBucket.id}
            className="tag-list">
            {allBucket.title}
          </p> : null
        }
        {
          createdBuckets.map((tag) => (
          <p
            onClick = {()=>{
              this.refs.selectTagOverlay.hide();
              this.props.addCard(this.props.ItemEntry, tag.id);
            }}
            key = {tag.id}
            className="tag-list">
            {tag.title}
          </p>
        ))}
        {
          archiveBucket ? 
          <p
            onClick = {()=>{
              this.refs.selectTagOverlay.hide();
              this.props.addCard(this.props.ItemEntry, archiveBucket.id);
            }}
            key = {archiveBucket.id}
            className="tag-list">
            {archiveBucket.title}
          </p> : null
        }
      </Popover>
    )
    return(
      <Col
        lg={6}
        md={6}
        sm={6}
        xs={12}
        style={{marginBottom: 15}}>
        <div
          className="search-entry-card"
          onClick={()=> {this.props.SelectEntry(this.props.ItemEntry)}}>
          <OverlayTrigger
            ref='selectTagOverlay'
            trigger="click"
            rootClose
            placement="right"
            overlay={createBucketPopover}>
            <i
              className="fa fa-lg fa-plus-square add-to-bucket-btn"
              aria-hidden="true">
            </i>
          </OverlayTrigger>
          <a
              href={this.props.ItemEntry.url}
              target="_blank">
            <h5
              className="card-title"
              style ={{marginBottom: 10, marginTop:0}}>
              {this.props.ItemEntry.name}
            </h5>
          </a>
          <div className="search-entry-left">
            <a
              href={this.props.ItemEntry.url}
              target="_blank">
              <img
                className= "yelp-image"
                src={this.props.ItemEntry.image_url}
                width="75"/>
            </a>
          </div>
          <div className="search-entry-right">
            <img
              src={this.props.ItemEntry.rating_img_url}
              width='100'/>
            <p className='p-no-margin'>
              Reviews: {this.props.ItemEntry.review_count}
            </p>
            <p className='p-no-margin'>
              {this.props.ItemEntry.location.city}
            </p>
          </div>
        </div>
      </Col>
    )
  }
}
