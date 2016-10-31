import React from 'react';
import { Modal , Button, FormControl} from 'react-bootstrap';
import CardEntry from './SearchEntry';

// export default ({close, createBucket}) => {
export default class AddModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      titleValue: '',
      yelpEntries: [],
      selectedEntries: []
    }
    this.handleTitleValue = this.handleTitleValue.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.selectEntry = this.selectEntry.bind(this);
  }
  render(){
    var {close, addBucket} = this.props;
    return(
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Search for a Card to Add</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
            <div>
              <input className = 'searchInput' type="text" placeholder="City" name="City"/>
              <input className = 'searchInput' type="text" placeholder="Category" name="Category"/>
            </div>
            <div style={{marginTop:25, display: 'inline-block'}}>
              {this.state.yelpEntries.map((entry) => <CardEntry addCard = {this.props.addCard} SelectEntry = {this.selectEntry} key = {entry.id} ItemEntry = {entry} /> )}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {close}>Close</Button>
          <Button onClick = {this.searchQuery}> Search </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
  }

  handleTitleValue(event){
    this.setState({titlevalue: event.target.value})
  }
  selectEntry(entryId){
    console.log(entryId.id + ' ' + entryId.name);
  }

  searchQuery(){
    var me = this;
    var cityValue = document.getElementsByName('City')[0].value;
    var categoryValue = document.getElementsByName('Category')[0].value;
    console.log('city input: ', cityValue, ' category input: ', categoryValue);
    if(cityValue && categoryValue){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            //set application state here
            var result = xhr.response;
            var yelpObject = result.businesses;
            me.setState({yelpEntries: yelpObject});
            console.log(yelpObject);
          } else{
            console.log('Ooops an error occured');
          }
        }
      }
      xhr.open('GET', '/search/' + cityValue + '/' + categoryValue);
      xhr.responseType = 'json'
      xhr.send();
    }

  }
}
