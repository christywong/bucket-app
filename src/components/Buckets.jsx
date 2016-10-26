import React from 'react';
export default class Bucket extends React.Component{

  render(){
    return(
      <div key = {this.props.key} className="card-style center-block">
        <div className="card-header center-block">
          <h2 style={{margin: 0, fontSize: 24}}>{this.props.cardTitle}</h2>
        </div>
        <div className="card-image center-block">
        </div>
        <p style= {{color:"#337ab7", cursor:'pointer', textAlign:'center', marginTop:5}}>
          Show past comments</p>
      </div>
    );
  }

}
