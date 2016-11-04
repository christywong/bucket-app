import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';

export default class AccountSettingsModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: 'false'
    }
  }
  render(){
    var {close} = this.props;
    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
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
                  close();
                  this.setState({showModal:false});
                }}>Close</Button>
              <Button 
                className="btn btn-success" 
                id="save-btn" 
                name="singlebutton"
                onClick = {()=>{
                  close();
                  this.setState({showModal:false});
                }}>Save</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        );
      }

  }