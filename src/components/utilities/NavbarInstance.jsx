import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Dropdown } from "react-bootstrap";
import { Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';
import AccountSettingsModal from './AccountSettingsModal';


export default class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: '',
      dropdown: false,
      target:'',
      newBucket:'',
      newMember: '',
      showModal: false
    }

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handlePopoverClick = this.handlePopoverClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this);

    //Bind our add bucket listeners
    this.handleClickBucket = this.handleClickBucket.bind(this);
    this.handleChangeBucket = this.handleChangeBucket.bind(this);
    this.handleSubmitBucket = this.handleSubmitBucket.bind(this);

    //Bind our add member listeners
    this.handleSubmitAddMember = this.handleSubmitAddMember.bind(this);
    this.handleChangeAddMember = this.handleChangeAddMember.bind(this);

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

  //Handlers for adding a group
  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    this.refs.overlayMember.hide();
    alert('the state value is: ' + this.state.value);
  }

  handleSubmitGroup(e) {
    this.refs.overlayGroup.hide();
    this.props.addGroup(this.state.value);
    this.setState({value: ''});
  }

  //Handlers for adding a bucket
  handleClickBucket(e) {
    this.setState({target: e.target, show: !this.state.show});
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

  //Handlers for adding a member
  handleChangeAddMember(e) {
    console.log(e.target.value);
    this.setState({newMember: e.target.value});
  }

  handleSubmitAddMember(e){
    this.refs.overlayAddMember.hide();
    this.props.addMember(this.state.newMember, this.props.currentGroup.id);
    this.setState({newMember:''});
  }



  render() {
    const currentGroupId = this.props.currentGroup ? this.props.currentGroup.id : null;
    const currentGroupTitle = this.props.currentGroup ? this.props.currentGroup.title : null;
    const currentGroupMembers = this.props.currentGroup ? this.props.currentGroup.members : null;
    const currentGroup = this.props.groups ? this.props.groups : [];

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

    const addMemberPopover= (
      <Popover
        id="popover-trigger-click-root-close"
        title="Add Friend">
        <input
          type="text"
          id="email-input"
          placeholder="Name"
          onChange={this.handleChangeAddMember}>
        </input>
        <input
          type="submit"
          id="submit-member"
          value="Add"
          onClick={this.handleSubmitAddMember}>
        </input>
      </Popover>
    );

    const createBucketPopover = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Add Bucket">
        <input
          type="text"
          id="bucket-name-input"
          placeholder="Bucket Name"
          onChange={this.handleChangeBucket}>
        </input>
        <input
          type="submit"
          id="submit-new-bucket"
          value="Add"
          onClick={this.handleSubmitBucket}>
        </input>
      </Popover>
    );

    const showMembersPopover = (
      <Popover id="popover-trigger-click-root-close" title="Friends" onClick = {()=>{
          this.refs.overlayMember.hide();
        }}>
        {currentGroupMembers ? currentGroupMembers.map((member) => (
          <p key={member.id} onClick = {()=>{
              this.refs.overlayMember.hide();
            }}>{member.name}</p>
        )) : null}
      </Popover>
    );

    return(
      <Navbar style={{zIndex: 500}} fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" style={{position: "absolute",left: 85, color: "#373a47", fontSize: 22}}>
              {currentGroupTitle}
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown
              eventKey={1}
              title="Add"
              id="basic-nav-dropdown">
              <OverlayTrigger
                id="popover-trigger-click-root-close"
                ref ="overlayAddMember"
                rootClose
                trigger="click"
                placement="bottom"
                overlay={addMemberPopover}>
                <MenuItem
                  onClick={this.handlePopoverClick}
                  id="submit-member">
                  Add Friend
                </MenuItem>
              </OverlayTrigger>
              <OverlayTrigger
                id="popover-trigger-click-root-close"
                ref="overlay"
                trigger="click"
                rootClose
                placement="bottom"
                overlay={createBucketPopover}>
                <MenuItem onClick={this.handleClickBucket}>
                  Add Bucket
                </MenuItem>
              </OverlayTrigger>
            </NavDropdown>

            <NavDropdown
              eventKey={1}
              id="groups-dropdown"
              title="Groups">
              {currentGroup.map((group)=>{
                return (
                  <MenuItem
                    eventKey={group.id}
                    key={group.id.toString()}
                    onClick={()=>{this.props.changeGroup(group.id)}}
                    >
                    {group.title}
                  </MenuItem>
                )
              })}
              <MenuItem divider />
              <OverlayTrigger
                id="popover-trigger-click-root-close"
                ref="overlayGroup"
                trigger="click"
                rootClose
                placement="bottom"
                overlay={createGroupPopover}>
                <MenuItem onClick={this.handlePopoverClick}>
                   Create Group
                </MenuItem>
              </OverlayTrigger>

              <OverlayTrigger
                id="popover-trigger-click-root-close"
                ref="overlayMember"
                trigger="click"
                rootClose
                placement="bottom"
                overlay={showMembersPopover}>
                <MenuItem>
                  View Group
                </MenuItem>
              </OverlayTrigger>
            </NavDropdown>

            <NavDropdown
              eventKey={2}
              title="Settings"
              id="basic-nav-dropdown">


              <MenuItem eventKey={2.1} onClick={this.props.showSettings}>
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
