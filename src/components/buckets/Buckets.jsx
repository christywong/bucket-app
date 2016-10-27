import React from 'react';
import CommentBox from '../comments/CommentBox';
export default class Bucket extends React.Component{
  render(){
    console.log('comment list', this.props.commentList);
    return(
      <div className="card-style center-block">
        <div className="card-header center-block">
          <h2 style={{margin: 0, fontSize: 24}}>{this.props.cardTitle}</h2>
        </div>
        <div className="card-image center-block">
        </div>
        <CommentBox commentList ={this.props.commentList} />
      </div>
    );
  }

}

//
// <p style= {{color:"#337ab7", cursor:'pointer', textAlign:'center', marginTop:5}}>
//   Show past comments
// </p>
//<CommentBox commentList ={this.props.commentList} />
