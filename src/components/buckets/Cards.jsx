import React from 'react';
import {OverlayTrigger, Popover, Button} from 'react-bootstrap';

export default class Cards extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const card = this.props.activities;
    const movePopover = (
      <Popover id="popover-trigger-click-root-close" title="Move to">
        {this.props.bucketTags.map((tag) => (
          <p key={tag.id} onClick = {()=>{
              this.props.moveCard(card, tag.id);
              this.refs.overlay.hide();
            }}
              className="tag-list">{tag.title}</p>
        ))}
      </Popover>
    );
    const deletePopover = (
      <Popover id="popover-trigger-click-root-close" title="Are you sure?">
        <Button bsStyle="danger" style={{marginLeft: 10}} bsSize="xsmall" onClick = {()=>{
            this.props.deleteCard(card.id);
            this.refs.overlay.hide();
          }}>Yes</Button>
        <Button style={{float:"right", marginRight: 10}} bsSize="xsmall" onClick = {()=>{
            this.props.deleteCard();
            this.refs.overlay.hide();
          }}> No</Button>
      </Popover>
    );
    return(
      <div className="card-style">
        <div className="edit-card-controls">
          <OverlayTrigger ref="overlay" trigger="click" rootClose placement="top" overlay={deletePopover}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </OverlayTrigger>
          <OverlayTrigger ref="overlay" trigger="click" rootClose placement="top" overlay={movePopover}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </OverlayTrigger>
        </div>

        <div className="card-header center-block">
          <h4 className="card-title" style={{margin: 0}}>{card.title}</h4>
        </div>

        <div className="card-left">
          <a href="https://www.yelp.com/biz/vallarta-express-mexican-eatery-san-diego?adjust_creative=SpLSZTvEK8wLBqyuM71G_g&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=SpLSZTvEK8wLBqyuM71G_g" target="_blank">
            <img src={card.img}
              width= '75'/>
          </a>
        </div>

        <div className="card-right">
          <img src={card.rating} />
          <p className='p-no-margin'> Reviews: {card.reviewCount} </p>
          <p className='p-no-margin'> {card.city} </p>
        </div>

      </div>
    );
  }
}
