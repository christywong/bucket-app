import React from 'react';
export default class Cards extends React.Component{
  render(){
    return(
      <div className="card-style">
        <div className="card-header center-block">
          <h2 style={{margin: 0, fontSize: 24}}>{this.props.cardTitle}</h2>
        </div>
        <p style={{color: '#337ab7', textAlign:'right', width:'90%', marginTop: 5, cursor: 'pointer'}}>Edit Card</p>

      </div>
    );
  }
}
// <div className="card-image center-block">
// </div>
