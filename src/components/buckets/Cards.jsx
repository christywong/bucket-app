import React from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

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
            }}
              className="tag-list">{tag.title}</p>
        ))}
      </Popover>
    )
    return(
      <div className="card-style">

        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={movePopover}>
          <p className='p-no-margin'style={editStyles}>Move</p>
        </OverlayTrigger>

        <div className="card-header center-block">
          <h4 style={{margin: 0}}>{card.title}</h4>
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

var editStyles = {
  color: '#337ab7',
  display: 'inline-block',
  float: 'right',
  right: 0,
  cursor: 'pointer',
  margin: 0
}
