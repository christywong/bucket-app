import React from 'react';
import Comment from './Comments';

export default({commentList}) => {
  return (
    <div className="comment-list">
      {commentList ? commentList.map((comment) => {
        return (<Comment key={comment.id} author={comment.author} text={comment.text}/>)
      }) : null}
    </div>
  )
}
