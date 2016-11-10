import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AddMemberModal extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

const backdropStyle = {
  zIndex: '1000',
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
              Add Friends
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Add Friend</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Friend Name"
                name="Friend Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              this.props.close();
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addMember}>Add</Button>

          </Modal.Footer>
           
            </Modal>
      </div>
    );
  }
}
