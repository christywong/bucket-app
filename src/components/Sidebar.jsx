import React from 'react';

export default class Sidebar extends React.Component{
  render(){
    var sidebarStyle = {
      //flexDirection: 'column',
      zIndex: 100,
      left: 0,
      top: 0,
      position: 'absolute',
      height: '100vh',
      width: '250px',
      backgroundColor: '#1F5081',
      margin: 'none'
    };
    var searchQueryStyle = {
      marginTop: 75,
      display: 'block'
    }
    var inputStyle = {
      marginTop: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      width: 180,
      paddingLeft: 5,
      border: 'none',
      borderRadius: 3
    }
    return(
      <div style={sidebarStyle}>
        <div className = "searchWrapper" style={searchQueryStyle}>
          <input style={inputStyle} type="text" placeholder="Zip Code" />
          <input style={inputStyle} type="text" placeholder="City" />
          <input style={inputStyle} type="text" placeholder="Category" />
        </div>
      </div>
    )
  }
}
