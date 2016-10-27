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
      <Form inline>
      <FormControl
        type="text"
        placeholder="Write a comment..."
        value = {this.state.comment}
        onChange = {(event)=>{
          this.onTextChange(event);
        }}
        />
      <Button onClick = {()=>{
          if(this.state.comment !== ''){
            this.props.postComment(this.state.comment, 0);
            this.setState({comment: ''})
          }
        }}>Post</Button>
      </Form>

    )
  }
  onTextChange(event){
    this.setState({comment: event.target.value})
  }
}
