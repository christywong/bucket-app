import React from 'react';
import {Button, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
export default class SearchEntry extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <Col lg={6} md={6} sm={6} xs={6} style={{marginBottom: 15}}>
          <div className="search-entry-card" onClick={()=> {this.props.SelectEntry(this.props.ItemEntry)}}>
            <Button className="add-to-bucket-btn">+</Button>
            <h5 style ={{color: 'black', marginBottom: 10, marginTop:0}}>{this.props.ItemEntry.name}</h5>
            <div className="search-entry-left">
              <a href={this.props.ItemEntry.url} target="_blank">
                <img className= "yelp-image" src={this.props.ItemEntry.image_url} width="75"/>
              </a>
            </div>
            <div className="search-entry-right">
              <p><span style={{fontWeight:"bold"}}>Rating: </span>{this.props.ItemEntry.rating}</p>
            </div>
          </div>
        </Col>
    )
  }
}
