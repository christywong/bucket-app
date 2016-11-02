import React from 'react';

import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Dropdown} from "react-bootstrap";

export default ({groups, changegroup}) => {
    return(
    <Navbar style={{zIndex: 500}} inverse fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">Bucket</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown eventKey={1} id="groups-dropdown" title="Groups">
            {groups.map((group)=>{
              return (<MenuItem onClick={()=>{changegroup(group.id)}}
               eventKey={group.dropdownid} 
               key={group.id.toString()}>{group.title}</MenuItem>)
            })}
            <MenuItem divider />
            <MenuItem eventKey={1.3} href="">Create Group</MenuItem>
          </NavDropdown>
          <NavItem eventKey={2} href="/archive.html">Bucket'd</NavItem>
            <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/settings.html">Account Settings</MenuItem>
              <MenuItem eventKey={3.2} href="/index.html">Logout</MenuItem>
            </NavDropdown>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  )
};
