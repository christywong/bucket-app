import React from 'react';
var styles = require("../static/styles/main.scss");
import Navbar  from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';

export default class App extends React.Component{
  render(){
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main />
      </div>
    );
  }
}
