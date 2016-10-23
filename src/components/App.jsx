import React from 'react';

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
