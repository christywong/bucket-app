import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AddMemberModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showMemberModal: 'false'
    }
  }

  render() {
const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50 + (Math.floor(Math.random() * 20) - 10);
  let left = 50 + (Math.floor(Math.random() * 20) - 10);

  return {

    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};

    return (
      <div className="static-modal">
          <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.showMemberModal}
          onHide={this.close}
        >

        <Modal.Dialog>
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                close();
                this.setState({showPager:false});
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
              close();
              this.setState({showPager:false});
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addMember}>Add</Button>
          </Modal.Footer>
            </Modal.Dialog>
            </Modal>
      </div>
    );
  }
}