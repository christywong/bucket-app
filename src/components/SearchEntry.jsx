import React from 'react';

export default class SearchEntry extends React.Component {
  render(){
    console.log(this.props);
    var cardStyle = {
      width: 200,
      height: 200,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    }
    return(
      <div style={cardStyle}>
        <p style ={{color: 'white'}}>{this.props.ItemEntry.name}</p>
        <img src={this.props.ItemEntry.image_url} width="150" style={{marginLeft:"auto", marginRight:"auto",display:'block'}}/>
      </div>
    )
  }
}
