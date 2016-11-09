import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';
import CardEntry from '../utilities/SearchEntry';

// export default ({close, createBucket}) => {
export default class AddModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      titleValue: '',
      yelpEntries: [],
      selectedEntries: [],
      showPager : false,
      pageOffset: 0,
      citySearch: '',
      categorySearch: ''
    }
    this.handleTitleValue = this.handleTitleValue.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.selectEntry = this.selectEntry.bind(this);
    // this.searchNext = this.searchNext.bind(this);
    this.getYelpData = this.getYelpData.bind(this);
  }
  render(){
    var {close, addBucket, bucketTags} = this.props;

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
                <Button className="close" onClick = {()=>{
                  close();
                  this.setState({showPager:false});
                }}>&times;</Button>
            <Modal.Title>
              Search for Your Next Adventure
            </Modal.Title>

          </Modal.Header>
          <Modal.Body className="modal-body">
            <div>
            <label>Find a City</label>
              <input
                className = 'searchInput'
                type="text"
                placeholder="City"
                name="City"/>
            <label>Find an Activity</label>
              <input
                className = 'searchInput'
                type="text"
                placeholder="Category"
                name="Category"/>
            </div>
            <div style={{marginTop:25}}>
              {this.state.yelpEntries.map((entry) =>
                <CardEntry
                  addCard = {this.props.addCard}
                  SelectEntry = {this.selectEntry}
                  key = {entry.id}
                  ItemEntry = {entry}
                  bucketTags = {bucketTags}/>
              )}
            </div>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick = {()=>{
                close();
                this.setState({showPager:false});
              }}>Close</Button>
                <Button className="btn btn-primary" onClick = {this.searchQuery}> Search </Button>
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
          this.getYelpData(cityValue, categoryValue, 0);
        }
      }

      getYelpData(cityValue, categoryValue, offSet){
        var me = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              //set application state here
              var result = xhr.response;
              var yelpObject = result.businesses;
              me.setState({yelpEntries: yelpObject, showPager: true, pageOffset: 0});
              console.log(yelpObject);
            } else{
              console.log('Ooops an error occured');
            }
          }
        }
        xhr.open('GET', '/search/' + cityValue + '/' + categoryValue + '/' + offSet);
        xhr.responseType = 'json'
        xhr.send();
      }

  }
