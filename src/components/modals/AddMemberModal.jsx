import React from 'react';
import { Modal , Button, FormControl, Pager, Table} from 'react-bootstrap';

export default class AddMemberModal extends React.Component{
  constructor(props){
    super(props);

    this.addMember = this.addMember.bind(this);
  }


  addMember(){
    var newMember = document.getElementsByName('new-member-name')[0].value;
    this.props.addMember(newMember);
    document.getElementsByName('new-member-name')[0].value = '';
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
                Friends List
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div>
                <label>
                  Add Friend
                </label>
                <input
                  className = 'addInput'
                  type="text"
                  placeholder="Friend Name"
                  name="new-member-name"/>
              </div>
              <div style={{marginTop: 20}}>
                <Table striped bordered condensed >
                  <thead>
                    <tr>
                      <th>
                        Username
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.friendsList.map((friend)=>(
                      <tr key = {friend._id}>
                        <td>
                          {friend.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick = {()=>{
                  this.props.close();
                }}>Close</Button>
                <Button
                  className="btn btn-primary"
                  onClick = {this.addMember}>Add</Button>

              </Modal.Footer>

            </Modal>
          </div>
        );
      }
    }
