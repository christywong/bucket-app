// import React from 'react';
// import CardEntry from './SearchEntry';
// import { Button } from 'react-bootstrap';
// import Bucket from '../buckets/Buckets.jsx';
//
// export default class Sidebar extends React.Component{
//   constructor (props) {
//     super(props);
//   }
//
//   render(){
//     var list = this.props.bucketList;
//     console.log(list);
//     return(
//       <div className='sidebar'>
//         {list.map ( (bucket) => { return(
//           <Bucket changeStateBucket={this.props.changeStateBucket}
//             key = {bucket.id}
//             bucketId = {bucket.id}
//             bucketName = {bucket.title}
//             active = {this.props.selectedBucket === bucket.id ? "active" : null} />)})}
//         <button type="button" id="create-bucket-button">Create New Bucket</button>
//       </div>
//     );
//   }
//
// }
import React from 'react';
import CardEntry from './SearchEntry';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Overlay } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import Bucket from '../buckets/Buckets.jsx';

export default class Sidebar extends React.Component{
  constructor (props) {
    super(props);

    this.handleClick = e => {
      this.setState({target: e.target, show: !this.state.show});
    };

    this.state = {show:false};
  }

  render(){
    var list = this.props.bucketList;
    console.log(list);
    return(
      <div className='sidebar'>
        {list.map ( (bucket) => { return(
          <Bucket changeStateBucket={this.props.changeStateBucket}
            key = {bucket.id}
            bucketId = {bucket.id}
            bucketName = {bucket.title}
            active = {this.props.selectedBucket === bucket.id ? "active" : null} />)})}
        <ButtonToolbar>
          <Button onClick={this.handleClick} id="create-bucket-button">
            Create New Bucket
          </Button>
          <Overlay
            show={this.state.show}
            target={this.state.target}
            placement="top"
            container={this}
            containerPadding={20}
          >
            <Popover id="popover-contained" title="Create Bucket">
              <input type="text" placeholder="Bucket Name"></input>
              <input id="submit-new-bucket" type="submit" value="Create"></input>
            </Popover>
          </Overlay>
        </ButtonToolbar>
      </div>
    );
  }

}
