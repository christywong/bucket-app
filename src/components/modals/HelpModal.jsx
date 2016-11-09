import React from 'react';
import { Modal , Button, Pager} from 'react-bootstrap';


  render() {
  const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

let rand = ()=> (Math.floor(Math.random() * 20) - 10);


const backdropStyle = {
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {

  let top = 50 + rand();
  let left = 50 + rand();

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
      <div className='static-modal'>
        <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div style={dialogStyle()} >
            <h4 id='modal-label'>Getting Started</h4>
            <p>
            <ul>Create your first Bucket by..</ul>
            <ul>Search for some activities by clicking on the + icon on the bottom right</ul>
            <ul>Add activities to your bucket by clicking on the + icon on the top right of each activity card</ul>
            <ul>Move an activity from one bucket to another by clicking on pencil & paper icon on the bottom right of each activity card</ul>
            <ul>Delete an activity from a bucket by clicking on the garbage icon on the bottom right of each activity card</ul>
            <ul>Create your own Group by...</u>
            <ul>Add some friends to your Group by...</ul>
            </p>
            <ModalExample/>
          </div>
        </Modal>
      </div>
    );
  }
}