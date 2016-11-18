import React from 'react';
import { Modal , Button, Pager} from 'react-bootstrap';


export default class HelpModal extends React.Component{
  constructor(props){
    super(props);
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
          >
          <Modal.Header>
            <Modal.Title>
              Getting Started
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Create a Tag: </strong>+ icon on the sidebar.</p>
            <p><strong>Search for Activities: </strong>+ icon on the bottom right.</p>
            <p><strong>Move Activities: </strong>edit icon on the activitiy card.</p>
            <p><strong>Delete an Activity: </strong>trash icon on the activity card.</p>
            <p><strong>Create a Group: </strong>Groups dropdown on the navbar.</p>
            <p><strong>Add Friends: </strong>Add Friends on the navbar &amp; enter your friend's name.</p>
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
