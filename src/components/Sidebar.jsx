import React from 'react';
import { Button } from 'react-bootstrap';
export default class Sidebar extends React.Component{

  render(){
    var sidebarStyle = {
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
      width: '80%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    var center = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
    var inputStyle = {
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      width: '100%',
      paddingLeft: 5,
      border: 'none',
      borderRadius: 3
    }

    return(
      <div style={sidebarStyle}>
        <div className = "searchWrapper" style={searchQueryStyle}>
          <input style={inputStyle} type="text" placeholder="Zip Code" />
          <input className = 'searchInput' style={inputStyle} type="text" placeholder="City" name="City"/>
          <input className = 'searchInput' style={inputStyle} type="text" placeholder="Category" name="Category"/>
          <Button onClick = {this.searchQuery}> Search </Button>
        </div>
      </div>
    )
  }

  searchQuery(){
    var cityValue = document.getElementsByName('City')[0].value;
    var categoryValue = document.getElementsByName('Category')[0].value;
    console.log('city input: ', cityValue, ' category input: ', categoryValue);
    if(cityValue && categoryValue){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log(xhr.responseText);
          } else{
            console.log('Ooops an error occured');
          }
        }
      }

      xhr.open('GET', '/search/' + cityValue + '/' + categoryValue);
      xhr.send();
    }
  }
}
