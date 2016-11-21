import React from 'react';
import {OverlayTrigger, Popover, Button} from 'react-bootstrap';

export default class Cards extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const card = this.props.activities;

    var tagLabel = null;
    var filteredTag;
    if(this.props.tags != null){
      filteredTag = this.props.tags.filter((tag) => (tag.id === card.tags[0]));
      if(filteredTag.length === 0 ){
        tagLabel = 'All';
      }
      else{
        tagLabel = filteredTag[0];
      }
    }


    const movePopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Move to"
        style={{width:"150px"}}
        >
        {this.props.bucketTags.map((tag) => (
          <p
            key={tag.id}
            onClick = {()=>{
              this.props.moveCard(card, tag.id);
              this.refs.overlay.hide();
            }}
            className="tag-list">
            {tag.title}
          </p>
        ))}
      </Popover>
    );
    const deletePopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Are you sure?"
        style={{width:"130px"}}
        >
        <Button
          bsStyle="danger"
          style={{marginLeft: 10}}
          bsSize="xsmall"
          onClick = {()=>{
            this.props.deleteCard(card.id);
            this.refs.deleteOverlay.hide();
          }}>Yes</Button>
          <Button
            style={{float:"right", marginRight: 10}}
            bsSize="xsmall"
            onClick = {()=>{
              this.props.deleteCard();
              this.refs.deleteOverlay.hide();
            }}> No</Button>
          </Popover>
        );
        return(
          <div className="card-style">
            <div className="edit-card-controls">
              <OverlayTrigger
                ref="deleteOverlay"
                trigger="click"
                rootClose
                placement="top"
                overlay={deletePopover}
                container={this}>
                <i className="fa fa-trash-o" aria-hidden="true">
                </i>
              </OverlayTrigger>
              <OverlayTrigger
                ref="overlay"
                trigger="click"
                rootClose
                placement="top"
                overlay={movePopover}
                container={this}>
                <i
                  className="fa fa-pencil-square-o"
                  aria-hidden="true">
                </i>
              </OverlayTrigger>
            </div>

            <div className="card-header center-block">
              <a href={card.yelpUrl} target="_blank">
                <h4 className="card-title" style={{margin: 0}}>
                  {card.title}
                </h4>
              </a>
            </div>
            <div className="card-left">
              <a href={card.yelpUrl} target="_blank">
                <img
                  src={card.img}
                  width= '75'/>
                <p>
                  View on Yelp
                </p>
              </a>
            </div>

            <div className="card-right">
              <img src={card.rating} />
              <p className='p-no-margin'> Reviews: {card.reviewCount} </p>
              <p className='p-no-margin'>
                {card.city}
              </p>
            </div>

            <p
              className='card-tag-label'
              onClick={()=>{this.props.changeStateBucket(tagLabel.id)}}>
              <i className="fa fa-tag" aria-hidden="true">
              </i>
              <span>
                {tagLabel.title}
              </span>
            </p>

          </div>
        );
      }
    }
