import React from 'react';

export default ({author,text}) => {
  return(
    <div className="comment">
      <p className='comment-name'>{author}: <span className="comment-text">{text}</span>
      </p>
    </div>
  )
}
