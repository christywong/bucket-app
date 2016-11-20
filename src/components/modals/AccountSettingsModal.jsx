import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AccountSettingsModal extends React.Component{
  constructor(props){
    super(props);
  }

  changePassword(){
    var password = document.getElementsByName('password')[0].value;
    var confirmPassword = document.getElementsByName('confirm-password')[0].value;

    if(password === confirmPassword){
    document.getElementById('errorMsg').innerHTML="";
     document.getElementsByName('password')[0].style.border='2px solid green';
     document.getElementsByName('confirm-password')[0].style.border='2px solid green';
     document.getElementById('successMsg').innerHTML="<span class='successmsg'>Password reset successfully.</span>"

      this.props.changePassword(password);
    }
     else{
     document.getElementById('successMsg').innerHTML="";
     document.getElementById('errorMsg').innerHTML="<span class='errormsg'>Passwords do not match.</span>";
;
     document.getElementsByName('password')[0].style.border='2px solid red';
     document.getElementsByName('confirm-password')[0].style.border='2px solid red';
    }
  }

  render(){
    var {close} = this.props;
    const backdropStyle = {
      zIndex: '1000',
      backgroundColor: '#fff',
      opacity: 0.8
    };

    return(
      <div className = "static-modal">
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
                Account Settings
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <form className="form-horizontal">
                <fieldset>
                  <div className="form-group">
                    <label
                      className="col-md-4 control-label"
                      htmlFor="passwordinput">
                      New Password
                    </label>
                    <div className="col-md-4">
                      <input
                        className="form-control input-md"
                        id="passwordinput"
                        name="password"
                        placeholder="New Password"
                        type="password">
                      </input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="col-md-4 control-label"
                      htmlFor="passwordinput">
                      Confirm Password
                    </label>
                    <div className="col-md-4">
                      <input
                        className="form-control input-md"
                        id="passwordinput"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        type="password">
                      </input>
                    </div>
                     <div className = "col-md-4 col-md-offset-4" id="errorMsg"></div>
                     <div className = "col-md-4 col-md-offset-4" id="successMsg"></div>

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
                    this.changePassword();
                  }}>Save</Button>
                </Modal.Footer>

              </Modal>
            </div>
          );
        }
      }
