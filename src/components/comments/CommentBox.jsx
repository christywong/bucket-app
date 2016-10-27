import React from 'react';
import CommentList from './CommentList';

export default class CommentBox extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="comment-box">
         <CommentList commentList = {this.props.commentList}/>
       </div>
     )
   }
}

//
