import React from 'react';
import {Button, Col, OverlayTrigger, Popover} from 'react-bootstrap';

export default class SearchEntry extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const createBucketPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Select a Tag">
        {this.props.bucketTags.map((tag) => (
          <p
            onClick = {()=>{
              this.refs.selectTagOverlay.hide();
              this.props.addCard(this.props.ItemEntry, tag.id);
            }}
            className="tag-list">
            {tag.title}
          </p>
        ))}
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
          <h5
            className="card-title"
            style ={{marginBottom: 10, marginTop:0}}>
            {this.props.ItemEntry.name}
          </h5>
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
            <p>
              Reviews: {this.props.ItemEntry.review_count}
            </p>
            <p>
              {this.props.ItemEntry.location.city}
            </p>
          </div>
        </div>
      </Col>
    )
  }
}
