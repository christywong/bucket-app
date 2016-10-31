import React from 'react';
export default class Bucket2 extends React.Component{
  render(){
    return(
      <div data-tag ={this.props.bucketId} className="bucket-tags" onClick={()=>{
        //console.log(e.target.getAttribute('class'));

        this.props.changeStateBucket(this.props.bucketId);
      }}>
        <h3 className="asf">{this.props.bucketName}</h3>
      </div>
    );
  }
}