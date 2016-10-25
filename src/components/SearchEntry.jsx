import React from 'react';

export default class SearchEntry extends React.Component {
  render(){
    console.log(this.props);
    var cardStyle = {
      width: 200,
      height: 125,
      display: "block",
      marginBottom: 20,
      borderBottom: 'solid 1px #D3D3D3',
      backgroundColor: '#fff'
    }
    return(
      <div style={cardStyle}>
        <p style ={{color: 'black', marginBottom: 5}}>{this.props.ItemEntry.name}</p>
        <img src={this.props.ItemEntry.image_url} width="75"/>
      </div>
    )
  }
}
