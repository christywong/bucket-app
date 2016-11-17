import React from 'react';
import {
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Dropdown
} from "react-bootstrap";
import {Button, ButtonToolbar, OverlayTrigger, Popover} from 'react-bootstrap';
import AccountSettingsModal from '../modals/AccountSettingsModal';

export default class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: '',
      dropdown: false,
      target: '',
      newBucket: '',
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
    if (!dropdown) {
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
    this.setState({
      target: e.target,
      show: !this.state.show
    });
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

  handleSubmitAddMember(e) {
    this.refs.overlayAddMember.hide();
    this.props.addMember(this.state.newMember, this.props.currentGroup.id);
    this.setState({newMember: ''});
  }

  render() {
    const currentGroupId = this.props.currentGroup ? this.props.currentGroup.id : null;
    const currentGroupTitle = this.props.currentGroup.title ? this.props.currentGroup.title : " ";
    const currentGroupMembers = this.props.currentGroup ? this.props.currentGroup.members : null;
    console.log(currentGroupMembers);
    const currentGroup = this.props.groups ? this.props.groups : [];

    const activeGroupTitle = this.props.currentGroup.title === "My Bucket" ? "Groups" : this.props.currentGroup.title;
    const showAddFriendsTab = this.props.currentGroup.title !== "My Bucket" ? 
                              ( <NavItem eventKey={2.4} onClick={this.props.showMember}> Add Friends</NavItem> ) : null;

    return (
      <Navbar
        style={{
          zIndex: 500
        }}
        fluid>
        <Navbar.Header>
          <Navbar.Brand
            style={{
              position: 'absolute',
              left: 35
            }}
            id="group-title-nav">
            {currentGroupTitle}
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>

            {showAddFriendsTab}

            <NavDropdown
              eventKey={3}
              id="groups-dropdown"
              title={activeGroupTitle}>
              {currentGroup.map((group) => {
                if (group.title != "My Bucket") {
                  return (
                    <MenuItem
                      key={group._id}
                      onClick={() => {
                        this.props.changeGroup(group._id)
                      }}>
                      {group.title}
                    </MenuItem>
                  )
                }
              })}

              <MenuItem divider/>

              <MenuItem
                eventKey={3.1}
                onClick={this.props.showGroups}>
                Create Group
              </MenuItem>

            </NavDropdown>

            <NavDropdown
              eventKey={4}
              id="settings-dropdown"
              title="Settings">
              <MenuItem
                eventKey={4.1}
                onClick={this.props.showSettings}>
                Account Settings
              </MenuItem>

              <MenuItem
                eventKey={4.2}
                onClick={this.props.showHelp}>
                Help
              </MenuItem>
              <MenuItem eventKey={4.3} href="/index.html">Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}
