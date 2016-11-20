import React from 'react';
import { Modal , Button, Pager, ButtonGroup} from 'react-bootstrap';


export default class HelpModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      step : 0
    }
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.selectStep = this.selectStep.bind(this);
  }

  render() {
    const backdropStyle = {
      zIndex: '1000',
      backgroundColor: '#fff',
      opacity: 0.8
    };
    const helpText = this.selectStep();
    const buttonRight = (this.state.step < 4) ? (<Button
      bsStyle="info"
      onClick={()=>{this.nextStep()}}>Next</Button>) : (
    <Button
      bsStyle="success"
      onClick={()=>{this.close()}}>Done</Button>);

    const currentStep = this.state.step+1;

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
            <Modal.Title>
              Getting Started
              <span style={{float:"right"}}>&nbsp;{currentStep}/5</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {helpText}
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{float:'left'}}
              onClick = {()=>{
                this.props.close();
              }}>Close</Button>
            <Button
              bsStyle="info"
              onClick={()=>{this.previousStep()}}>Previous</Button>
            {buttonRight}

            </Modal.Footer>
          </Modal>
        </div>
      );
    }

    nextStep(){
      if(this.state.step < 4){
        this.setState({
          step: this.state.step + 1
        })
      }
    }

    previousStep(){
      if(this.state.step > 0){
        this.setState({
          step: this.state.step -1
        })
      }
    }
    close(){
      this.setState({
        step: 0
      });
      this.props.close();
    }

    selectStep(){
      var step = this.state.step;
      switch(step){
        case 0:
          return(<p>
            <strong>To Create a Tag&nbsp;</strong>
            click the + icon on the sidebar.
          </p>)
          break;

        case 1:
          return(<p>
            <strong>To Search for Activities&nbsp;</strong>
            click the + icon on the bottom right of the screen.
          </p>)
          break;
        case 2:
          return(<p>
            <strong>To Edit Activities&nbsp;</strong>
            click the icons on the bottom right of the activity card.
          </p>)
          break;
        case 3:
          return(<p>
            <strong>To Create a Group&nbsp;</strong>
            Click the Groups dropdown on the navbar.
          </p>)
          break;
        case 4:
          return(<div><p>
            <strong>To Add and View Friends&nbsp;</strong>
            Click the Add friends link on the navbar.
            </p>
            <p><strong>Note: You cannot add friends to "My Bucket".</strong></p>
            </div>
          )
          break;
      }

    }
  }
