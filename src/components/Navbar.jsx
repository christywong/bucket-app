import React from 'react';

import {Navbar, NavItem, Nav} from "react-bootstrap";

export default class NavigationBar extends React.Component{
  render(){
    return(
      <Navbar style={{zIndex: 500}} inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href = "/home">Buckets</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem>Link1</NavItem>
            <NavItem>Link2</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
};
