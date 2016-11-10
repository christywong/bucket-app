import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AddGroupModal extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

const backdropStyle = {
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.8
};


    return (
      <div>
          <Modal
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.props.visibility}  
        >
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                this.props.close();
               
              }}>&times;</Button>
            <Modal.Title>
              Create Group
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Name Your Group</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Group Name"
                name="Group Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              this.props.close();
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addGroup}>Create</Button>

          </Modal.Footer>
           
            </Modal>
      </div>
    );
  }
}


