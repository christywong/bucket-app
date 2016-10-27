import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="comment-box center-block">
         <CommentList commentList = {this.props.commentList}/>
         <CommentForm
           bucketId = {this.props.bucketId} 
           postComment = {this.props.postComment}/>
       </div>
     )
   }
}
