import React from 'react';
import CardEntry from './SearchEntry';
import { Button } from 'react-bootstrap';
export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      yelpEntries: []
    };
    this.searchQuery = this.searchQuery.bind(this);
  }

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
          <div className = "searchResults" style={{marginTop:25}}>
            {this.state.yelpEntries.map((entry) => <CardEntry key = {entry.id} ItemEntry = {entry} /> )}
          </div>
        </div>

      </div>
    )
  }

  searchQuery(){
    var me = this;

    var cityValue = document.getElementsByName('City')[0].value;
    var categoryValue = document.getElementsByName('Category')[0].value;
    console.log('city input: ', cityValue, ' category input: ', categoryValue);
    if(cityValue && categoryValue){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            //set application state here
            var result = xhr.response;
            var yelpObject = result.businesses;
            me.setState({yelpEntries: yelpObject});
            console.log(yelpObject);
          } else{
            console.log('Ooops an error occured');
          }
        }
      }
      xhr.open('GET', '/search/' + cityValue + '/' + categoryValue);
      xhr.responseType = 'json'
      xhr.send();
    }
  }
}
