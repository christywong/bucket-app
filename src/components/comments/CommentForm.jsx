import React from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';

export default class CommentForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    }
    this.onTextChange = this.onTextChange.bind(this);
  }
  render(){
    return(
        <FormControl
          className='comment-form'
          type="text"
          placeholder="Write a comment..."
          value = {this.state.comment}
          onChange = {(event)=>{
            this.onTextChange(event);
          }}
          onKeyPress = {(event)=>{
            if(event.key === 'Enter' && this.state.comment !== ''){
              this.props.postComment(this.state.comment, this.props.bucketId);
              this.setState({comment: ''})
            }
          }}
        />
    )
  }
  onTextChange(event){
    this.setState({comment: event.target.value})
  }
}

// Just in case we need it
//
// <Form className="comment-post" inline>
//   <FormControl
//     type="text"
//     placeholder="Write a comment..."
//     value = {this.state.comment}
//     onChange = {(event)=>{
//       this.onTextChange(event);
//     }}
//     onKeyPress = {(event)=>{
//       if(event.key === 'Enter' && this.state.comment !== ''){
//         this.props.postComment(this.state.comment, 0);
//         this.setState({comment: ''})
//       }
//
//       return false;
//
//     }}
//     />
//   <Button onClick = {()=>{
//       if(this.state.comment !== ''){
//         this.props.postComment(this.state.comment, 0);
//         this.setState({comment: ''})
//       }
//     }}>Post</Button>
// </Form>
