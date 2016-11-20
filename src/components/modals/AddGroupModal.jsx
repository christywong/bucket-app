import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AddGroupModal extends React.Component{
  constructor(props){
    super(props);
    this.createGroup = this.createGroup.bind(this);
  }

  createGroup() {
    var groupName = document.getElementsByName('Group-Name')[0].value;
    this.props.addGroup(groupName);
    this.props.close();
  }

  render() {

    const backdropStyle = {
      zIndex: '1000',
      backgroundColor: '#fff',
      opacity: 0.8
    };


    return (
      <div>
        <Modal
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.props.visibility}
          onHide={()=>{this.props.close()}}
          backdrop={true}
          >
          <Modal.Header>
            <Button
              className="close"
              onClick = {()=>{
                this.props.close();

              }}>&times;</Button>
              <Modal.Title>
                Create Group
              </Modal.Title>

            </Modal.Header>
            <Modal.Body className="modal-body">
              <div>
                <label>
                  Name Your Group
                </label>
                <input
                  className = 'addInput'
                  type="text"
                  placeholder="Group Name"
                  name="Group-Name"/>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick = {()=>{
                  this.props.close();
                }}>Close</Button>
                <Button
                  className="btn btn-primary"
                  onClick = {this.createGroup}>Create</Button>
              </Modal.Footer>

            </Modal>
          </div>
        );
      }

    }
