import React from 'react';
import { Modal, Button, FormControl, Pager } from 'react-bootstrap';

export default class AddBucketModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }

    this.addBucket = this.addBucket.bind(this);
  }

  addBucket() {
    var newBucket = document.getElementsByName('bucket-name')[0].value;
    this.props.addBucket(newBucket);
    document.getElementsByName('bucket-name')[0].value = "";
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
          backdrop={true}
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.props.visibility}
          onHide={()=>{this.props.close()}}
        >
          <Modal.Header>
            <Button className="close" onClick = {()=>{
                this.props.close();
               }}>&times;</Button>
            <Modal.Title>
              Add a New Tag
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div>
              <label>Create Your Tag</label>
              <input
                className = 'addInput'
                type="text"
                placeholder="Tag Name"
                name="bucket-name" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = {()=>{
              this.props.close();
              }}>Close</Button>
            <Button className="btn btn-primary" onClick={this.addBucket}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
