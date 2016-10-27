import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="comment-box">
         <CommentList commentList = {this.props.commentList}/>
         <CommentForm postComment = {this.props.postComment}/>
       </div>
     )
   }
}
