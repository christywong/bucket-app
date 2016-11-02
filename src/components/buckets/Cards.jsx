import React from 'react';
export default class Cards extends React.Component{
  render(){
    return(
      <div className="card-style">
          <p className='p-no-margin' style={{color: '#337ab7', textAlign:'right', width:'90%', marginTop: 5, cursor: 'pointer'}}>Edit Card</p>
        <div className="card-header center-block">
          <h4 style={{margin: 0}}>{this.props.cardTitle}</h4>
        </div>
        <div className="card-left">
          <a href="https://www.yelp.com/biz/vallarta-express-mexican-eatery-san-diego?adjust_creative=SpLSZTvEK8wLBqyuM71G_g&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=SpLSZTvEK8wLBqyuM71G_g" target="_blank">
            <img src={this.props.img}
              width= '75'/>
          </a>
          </div>
        <div className="card-right">
          <img src={this.props.rating} />
          <p className='p-no-margin'> Reviews: {this.props.reviewCount} </p>
          <p className='p-no-margin'> {this.props.city} </p>
        </div>

      </div>
    );
  }
}
