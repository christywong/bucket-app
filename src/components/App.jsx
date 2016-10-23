import React from 'react';
var styles = require("../styles/main.scss");
import Component  from './Components';
import Navbar  from './Navbar';
import Sidebar from './Sidebar'

export default class App extends React.Component{
  render(){
    return (
      <div>
        <Navbar />
        <Sidebar />
      </div>
    );
  }
}
