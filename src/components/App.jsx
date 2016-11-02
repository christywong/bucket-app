import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar from './utilities//Navbar';
import Main from './Main';
import uuid from 'uuid';
import update from 'react-addons-update';
import NavbarInstance from './utilities/NavbarInstance';


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        data: {
            groups: [],
            currentGroup: {
                buckets: []
            }
        }
    }
    this.changeGroup = this.changeGroup.bind(this);
  }

  componentDidMount() {
      this.loadJSONData();
  }

  render(){
    return (
      <div>
        <NavbarInstance groups = {this.state.datagroups} />
        <Main currentGroup = {currentGroup} />
      </div>
    );
  }

  loadJSONData(){
    var me = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          //set application state here
          var result = xhr.response;
          me.setState({
            data: result
          });
        } else{
          console.log('Ooops an error occured');
        }
      }
    }
      xhr.open('GET', '/api/getData');
      xhr.responseType = 'json'
      xhr.send();
  }

  changeGroup(currentGroupId){
    const newGroup = this.state.data.groups.filter((group)=>(currentGroupId===group.id))[0];
    this.setState({
      data: update(this.state.data,{currentGroup: {$set: newGroup}})
    });
  }

}
