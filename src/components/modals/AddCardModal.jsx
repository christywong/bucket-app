import React from 'react';
import { Modal , Button, FormControl, Pager} from 'react-bootstrap';
import CardEntry from '../utilities/SearchEntry';
import Loader from 'react-loader';

// export default ({close, createBucket}) => {
export default class AddModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      titleValue: '',
      yelpEntries: [],
      selectedEntries: [],
      showPager : false,
      pageNumber: 0,
      pageSize: 20,
      citySearch: '',
      categorySearch: '',
      yelpLoaded: true,
      disableNext: false,
      numberOfBusiness:
    }
    this.handleTitleValue = this.handleTitleValue.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.selectEntry = this.selectEntry.bind(this);
    this.searchYelpData = this.searchYelpData.bind(this);
    this.pageYelpData = this.pageYelpData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  render(){
    var {close, addBucket, bucketTags} = this.props;

    const backdropStyle = {
      zIndex: '1000',
      backgroundColor: '#fff',
      opacity: 0.8
    };
    var disablePrevious = this.state.pageNumber > 0? false : true;

    return(
      <div className="static-modal">
        <Modal
          backdrop={true}
          aria-labelledby='modal-label'
          backdropStyle={backdropStyle}
          show={this.props.visibility}
          onHide={()=>{this.props.close()}}
          >
          <Modal.Header>
            <Button
              className="close"
              onClick = {()=>{
                this.props.close();
              }}>&times;</Button>
              <Modal.Title>
                Create Your Next Adventure
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div>
                <label>
                  Find a City <span style={{color:'red'}}>*</span>
                </label>
                <input
                  className = 'searchInput'
                  type="text"
                  placeholder="City"
                  name="City"/>
                <label>
                  Find an Activity
                </label>
                <input
                  className = 'searchInput'
                  type="text"
                  placeholder="Category"
                  name="Category"/>
              </div>

              <div style={{marginTop:15, height: 25, position: 'relative'}}>
                <Loader loaded={this.state.yelpLoaded}>
                  {this.state.yelpEntries.map((entry) =>
                    <CardEntry
                      addCard = {this.props.addCard}
                      SelectEntry = {this.selectEntry}
                      key = {entry.id}
                      ItemEntry = {entry}
                      bucketTags = {bucketTags}/>
                  )}
                  {this.state.showPager ?
                    <Pager>
                      <Pager.Item
                        onClick = {this.previousPage}
                        disabled = {disablePrevious}
                        previous
                        href="#">
                        &larr; Previous Page
                      </Pager.Item>
                      <p>{this.state.numberOfBusiness}</p>
                      <Pager.Item
                        onClick = {this.nextPage}
                        disabled = {this.state.disableNext}
                        next
                        href="#">
                        Next Page &rarr;
                      </Pager.Item>
                    </Pager>
                    : null}
                  </Loader>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick = {()=>{
                    this.props.close();
                  }}>Close</Button>
                  <Button
                    className="btn btn-primary"
                    onClick = {this.searchQuery}> Search </Button>
                </Modal.Footer>

              </Modal>
            </div>
          )
        }

        handleTitleValue(event){
          this.setState({titlevalue: event.target.value})
        }
        selectEntry(entryId){
        }

        searchQuery(){
          var me = this;
          var cityValue = document.getElementsByName('City')[0].value;
          var categoryValue = document.getElementsByName('Category')[0].value;

          if(cityValue){
            this.setState({
              yelpLoaded: false
            });

            this.searchYelpData(cityValue, categoryValue);
          }
        }

        nextPage(){
          var cityValue = document.getElementsByName('City')[0].value;
          var categoryValue = document.getElementsByName('Category')[0].value;
          var nextPage = this.state.pageNumber + 1;
          this.setState({
            pageNumber: this.state.pageNumber + 1,
            yelpLoaded: false
          },this.pageYelpData(cityValue, categoryValue, nextPage));

        }

        previousPage(){
          var cityValue = document.getElementsByName('City')[0].value;
          var categoryValue = document.getElementsByName('Category')[0].value;

          if(this.state.pageNumber > 0){
            var previousPage = this.state.pageNumber - 1;
            this.setState({
              pageNumber: this.state.pageNumber - 1,
              yelpLoaded: false
            },this.pageYelpData(cityValue, categoryValue, previousPage));
          }
          else{
            this.setState({
              disablePrevious: true
            })
          }
        }

        searchYelpData(cityValue, categoryValue){
          this.setState({
            pageNumber: 0
          },this.pageYelpData(cityValue, categoryValue, 0));

        }

        pageYelpData(cityValue, categoryValue, newPageNumber){
          var me = this;
          var xhr = new XMLHttpRequest();
          var payload;

          var pageSize = this.state.pageSize * newPageNumber;
          if(categoryValue){
            payload = '/search/' + cityValue + '/' + categoryValue  + '/' + pageSize;
          }
          else{
            payload = '/searchCity/' + cityValue + '/' + pageSize;
          }
          xhr.onreadystatechange = function () {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                //set application state here
                var result = xhr.response;
                var yelpObject = result.businesses;
                me.setState({
                  yelpEntries: yelpObject,
                  yelpLoaded: true,
                  showPager: true,
                  numberOfBusiness: result.total
                });
              } else{
                console.log('Ooops an error occured');
              }
            }
          }
          xhr.open('GET', payload);
          xhr.responseType = 'json'
          xhr.send();
        }

      }
