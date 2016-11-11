<div>
        import React from 'react';
        import { Modal , Button, Pager} from 'react-bootstrap';
        export default class HelpModal extends React.Component{
        constructor(props){
        super(props);
        }
        render() {
        const backdropStyle = {
        zIndex: '1000',
        backgroundColor: '#000',
        opacity: 0.8
        };
        return (
        <div>
          <modal aria-labelledby="modal-label" backdropstyle="{backdropStyle}" show="{this.props.visibility}">
            <modal.header>
              <modal.title>
                Getting Started
              </modal.title>
            </modal.header>
            <modal.body>
              <p>1) Create your first bucket by clicking on the Create Bucket button on the sidebar.</p>
              <p>2) Search for activities to add by clicking the icon on the bottom right.</p>
              <p>3) Move activities to different buckets by clicking on the edit icon on the activitiy card.</p>
              <p>4) Delete an activity from a bucket by clicking on the trash icon on the activity card.</p>
              <p>5) Create a bucket list with friends by clicking on Groups on the navbar.</p>
              <p>6) Start adding friends to your Groups!</p>
            </modal.body>
            <modal.footer>
              <button onclick="{()=">{
                this.props.close();
                }}&gt;Close</button>
            </modal.footer>
          </modal>
        </div>
        );
        }
        }
      </div>
      
