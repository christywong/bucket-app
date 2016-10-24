import React from 'react';
export default class Bucket extends React.Component{

  render(){

    var cardStyle = {
      width: '90%',
      height: 400,
      backgroundColor: '#fff',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 3,
      border: 'solid 1px #D3D3D3',
    };

    var cardHeader = {
      margin: 'none',
      borderBottom: 'solid 1px #D3D3D3',
      width: '90%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 10,
      paddingBottom: 10
    };

    var cardImage = {
      width: "90%",
      height: 120,
      backgroundColor: "gray",
      display: "block",
      marginTop: 10,
      marginLeft: "auto",
      marginRight: "auto"
    };


    return(
      <div style={cardStyle}>
        <div style={cardHeader}>
          <h2 style={{margin: 0, fontSize: 24}}>{this.props.cardTitle}</h2>
        </div>
        <div style= {cardImage}>
        </div>
        <p style= {{color:"#337ab7", cursor:'pointer', textAlign:'center', marginTop:5}}>
          Show past comments</p>
      </div>
    );
  }

}
