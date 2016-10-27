import React from 'react';
import { Modal , Button, FormControl} from 'react-bootstrap';

// export default ({close, createBucket}) => {
export default class AddModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {titleValue: ''}
    this.handleTitleValue = this.handleTitleValue.bind(this);
  }
  render(){
    var {close, addBucket} = this.props;
    return(
    <div className="static-modal" >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add a Bucket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Ex. Beach Things..."
            onChange= {(event)=>{this.handleTitleValue(event)}}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {close}>Close</Button>
          <Button onClick = {()=>{addBucket(this.state.titlevalue)}} bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
  }

  handleTitleValue(event){
    this.setState({titlevalue: event.target.value})
  }
}
