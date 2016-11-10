import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AccountSettingsModal extends React.Component{
  constructor(props){
    super(props);
    }

  render(){
    var {close} = this.props;

const backdropStyle = {
  zIndex: '1000',
  backgroundColor: '#000',
  opacity: 0.8
}; 

    return(
      <div className = "static-modal">
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
              Account Settings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="textinput">Change Name</label>

                  <div className="col-md-4">
                    <input className="form-control input-md" id="textinput" name="textinput" placeholder="New Name" type="text"></input>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="textinput">Change Email ID</label>
                  <div className="col-md-4">
                    <input className="form-control input-md" id="textinput" name="textinput" placeholder="New Email" type="text"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="passwordinput">New Password</label>
                  <div className="col-md-4">
                    <input className="form-control input-md" id="passwordinput" name="passwordinput" placeholder="New Password" type="password"></input>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="passwordinput">Confirm Password</label>
                  <div className="col-md-4">
                    <input className="form-control input-md" id="passwordinput" name="passwordinput" placeholder="Confirm Password" type="password"></input>
                  </div>
                </div>

              </fieldset>
            </form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick = {()=>{
                  this.props.close();
                }}>Close</Button>
              <Button
                className="btn btn-danger"
                id="save-btn"
                name="singlebutton"
                onClick = {()=>{
              this.props.close();
                }}>Save</Button>
              </Modal.Footer>
              
            </Modal>
          </div>
        );
      }
  }

