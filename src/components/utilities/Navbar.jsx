import React from 'react';

import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from "react-bootstrap";

export default () => {
    return(
      <Navbar style={{zIndex: 500}} inverse fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Bucket</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Groups</NavItem>
        <NavItem eventKey={2} href="#">Bucket'd</NavItem>
          <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Account Settings</MenuItem>
            <MenuItem eventKey={3.2}>Logout</MenuItem>
          </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
};
