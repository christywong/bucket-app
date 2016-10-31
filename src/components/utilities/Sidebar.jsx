import React from 'react';
import CardEntry from './SearchEntry';
import { Button, Col } from 'react-bootstrap';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      yelpEntries: [],
      selectedEntries: []
    };
    this.searchQuery = this.searchQuery.bind(this);
    this.selectEntry = this.selectEntry.bind(this);
  }

  render(){
    return(
        <div>
          <div>
          <input className = 'searchInput' type="text" placeholder="City" name="City"/>
          <input className = 'searchInput' type="text" placeholder="Category" name="Category"/>
          </div>
          <div style={{marginTop:25, display: 'inline-block'}}>
            {this.state.yelpEntries.map((entry) => <CardEntry SelectEntry = {this.selectEntry} key = {entry.id} ItemEntry = {entry} /> )}
          </div>
        </div>
    );
  }

  selectEntry(entryId){
    console.log(entryId.id + ' ' + entryId.name);
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
