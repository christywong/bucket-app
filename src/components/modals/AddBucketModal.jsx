import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AddBucketModal extends React.Component{
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
              Create a Bucket
            </Modal.Title>

          </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
            <label>Name Your Bucket</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Bucket Name"
                name="Bucket Name"/>
            </div>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              this.props.close();
              }}>Close</Button>
            <Button className="btn btn-primary" onClick = {this.addBucket}>Create</Button>

          </Modal.Footer>
           
            </Modal>
      </div>
    );
  }
}
