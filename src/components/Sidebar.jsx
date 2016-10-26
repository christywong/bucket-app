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
    return(
      <div className='sidebar'>
        <div className = "searchWrapper center-block">
          <input className = 'searchInput' type="text" placeholder="City" name="City"/>
          <input className = 'searchInput' type="text" placeholder="Category" name="Category"/>
          <Button onClick = {this.searchQuery}> Search </Button>
          <div className = "searchResults" style={{marginTop:25}}>
            {this.state.yelpEntries.map((entry) => <CardEntry key = {entry.id} ItemEntry = {entry} /> )}
          </div>
        </div>
      </div>
    );
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
