import React from 'react';
export default class Component extends React.Component {
  render() {
    var styles = {
      float: 'right'
    }
    return (
      <div style = {styles}>
        <h1> Hello Welcome to our Application built on React! </h1>
      </div>
    )
  }
}
