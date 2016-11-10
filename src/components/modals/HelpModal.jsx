import React from 'react';
import { Modal , Button, Pager} from 'react-bootstrap';


 export default class HelpModal extends React.Component{
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
          <Modal.Title>
          Getting Started
          </Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <p>Create your first bucket by clicking on + icon on the bottom of the sidebar.</p>
            <p>Search for activities by clicking on + icon on the bottom right.</p>
            <p>Add activity to your bucket by clicking on the paper pencil icon on the activity card.</p>
            <p>Delete an activity from a bucket by clicking on the trash icon on the activity card.</p>
            <p>Create a bucket list with friends by clicking on Groups on the navbar.</p>

          </Modal.Body>
        <Modal.Footer>
            <Button onClick = {()=>{
              this.props.close();      
              }}>Close</Button>
          </Modal.Footer>          
        </Modal>
      </div>
    );
  }
}