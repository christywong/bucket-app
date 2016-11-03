import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Dropdown } from "react-bootstrap";
import { Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';

export default class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: '',
      dropdown: false,
      target:'',
      newBucket:''
    }

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handlePopoverClick = this.handlePopoverClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this);

    this.handleClickBucket = this.handleClickBucket.bind(this);
    this.handleChangeBucket = this.handleChangeBucket.bind(this);
    this.handleSubmitBucket = this.handleSubmitBucket.bind(this);
  }

  handleDropdownClick(e) {
    var dropdown = this.state.dropdown;
    var show = this.state.show;
    if(!dropdown) {
      this.setState({dropdown: true});
    } else if (dropdown && show) {
      this.setState({dropdown: true});
    } else if (dropdown && !show) {
      this.setState({dropdown: false});
    }
    console.log('event ', e);
    console.log(this.state.dropdown);
  }

  handlePopoverClick(e) {
    this.setState({
      target: e.target,
      show: !this.state.show,
      dropdown: true
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    this.refs.overlayMember.hide();

  }

  handleSubmitGroup(e) {
    this.refs.overlayGroup.hide();
    this.props.addGroup(this.state.value);
    this.setState({value: ''});
  }

  handleClickBucket(e) {
    this.setState({target: e.target, show: !this.state.show});
    this.refs.overlayBucket.hide();

  }

  handleChangeBucket(e) {
    this.setState({newBucket: e.target.value});
  }

  handleSubmitBucket(e) {
    //this.setState({show: false});
    this.refs.overlay.hide();
    this.props.addBucket(this.state.newBucket, this.props.currentGroup.id);
    this.setState({newBucket: ''});
  }

  render() {
    const currentGroupId = this.props.currentGroup ? this.props.currentGroup.id : null;
    const currentGroupTitle = this.props.currentGroup ? this.props.currentGroup.title : null;

    const createGroupPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Create Group">
        <input
          type="text"
          id="group-name-input"
          placeholder="Group Name"
          onChange={this.handleChange}>
        </input>
        <input
          type="submit"
          id="submit-new-group"
          value="Create"
          onClick={this.handleSubmitGroup}>
        </input>
      </Popover>
    );

    const popoverMember = (
      <Popover id="popover-trigger-click-root-close" title="Add Member">
        <input type="text" id="email-input" placeholder="Email" onChange={this.handleChange}></input>
        <input type="submit" id="submit-member" value="Add" onClick={this.handleSubmit}></input>
      </Popover>
    );

    const createBucketPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Create Bucket">
        <input
          type="text"
          id="bucket-name-input"
          placeholder="Bucket Name"
          onChange={this.handleChangeBucket}>
        </input>
        <input
          type="submit"
          id="submit-new-bucket"
          value="Create"
          onClick={this.handleSubmitBucket}>
        </input>
      </Popover>
    );

    return(
      <Navbar style={{zIndex: 500}} inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{currentGroupTitle}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Add" id="basic-nav-dropdown">
              <OverlayTrigger ref ="overlayMember" rootClose trigger="click" placement="left" overlay={popoverMember}>
                <MenuItem onClick={this.handlePopoverClick} id="submit-member">Add Member</MenuItem>
              </OverlayTrigger>
              <OverlayTrigger ref="overlay" trigger="click" rootClose placement="left" overlay={createBucketPopover}>
                <MenuItem onClick={this.handleClickBucket}>
                  Add Bucket
                </MenuItem>
              </OverlayTrigger>
            </NavDropdown>

            <NavDropdown  eventKey={1} id="groups-dropdown" title="Groups">
              {this.props.groups.map((group)=>{
                return (
                  <MenuItem
                    eventKey={group.dropdownid}
                    key={group.id.toString()}
                    onClick={()=>{this.props.changeGroup(group.id)}}
                    >
                    {group.title}
                  </MenuItem>
                )
              })}
              <MenuItem divider />
              <ButtonToolbar>
                <OverlayTrigger
                  id="popover-trigger-click-root-close"
                  ref="overlayGroup"
                  trigger="click"
                  rootClose
                  placement="bottom"
                  overlay={createGroupPopover}>
                  <MenuItem
                    onClick={this.handlePopoverClick}
                    id="create-group-button">
                    Create New Group
                  </MenuItem>
                </OverlayTrigger>
              </ButtonToolbar>
            </NavDropdown>
            <NavDropdown
              eventKey={2}
              title="Settings"
              id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="/settings.html">
                Account Settings
              </MenuItem>
              <MenuItem eventKey={2.2} href="/index.html">Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
