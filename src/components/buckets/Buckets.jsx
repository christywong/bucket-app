import React from 'react';
import CommentBox from '../comments/CommentBox';
export default class Bucket extends React.Component{
  render(){
    return(
      <div className="card-style center-block">
        <div className="card-header center-block">
          <h2 style={{margin: 0, fontSize: 24}}>{this.props.cardTitle}</h2>
        </div>
        <p style={{color: '#337ab7', textAlign:'right', width:'90%', marginTop: 5, cursor: 'pointer'}}>Edit Card</p>
        <div className="card-image center-block">
        </div>
        <CommentBox
          bucketId = {this.props.bucketId}
          commentList = {this.props.commentList}
          postComment = {this.props.postComment}
          />
      </div>
    );
  }
}