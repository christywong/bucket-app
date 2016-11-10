import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AccountSettingsModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: 'false'
    }
  }

  changePassword(){
    var password = document.getElementsByName('password')[0].value;
    var confirmPassword = document.getElementsByName('confirm-password')[0].value;

    if(password === confirmPassword){
      this.props.changePassword(password);
      this.props.close();
      alert('Password Changed');
    }
  }
  
  render(){
    var {close} = this.props;
    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Button className="close" onClick = {()=>{
              close();
              this.setState({showModal:false});
            }}>&times;</Button>
            <Modal.Title>
              Account Settings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <form className="form-horizontal">
              <fieldset>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="passwordinput">New Password</label>
                  <div className="col-md-4">
                    <input className="form-control input-md" id="passwordinput" name="password" placeholder="New Password" type="password"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="passwordinput">Confirm Password</label>
                  <div className="col-md-4">
                    <input className="form-control input-md" id="passwordinput" name="confirm-password" placeholder="Confirm Password" type="password"></input>
                  </div>
                </div>

              </fieldset>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick = {()=>{
                  close();
                  this.setState({showModal:false});
                }}>Close</Button>
              <Button
                className="btn btn-danger"
                id="save-btn"
                name="singlebutton"
                onClick = {()=>{
                  this.changePassword();
                  this.setState({showModal:false});
                }}>Save</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        );
      }

  }
