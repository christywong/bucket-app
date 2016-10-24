import React from 'react';
import Bucket from './Buckets';
import {Grid, Row, Col} from 'react-bootstrap';


export default class Component extends React.Component {
  render() {
    var styles = {
      marginLeft: 250
    }
    var addBtn = {
      position: 'fixed',
      lineHeight: '45px',
      textAlign: "center",
      backgroundColor: 'rgb(31, 80, 129)',
      color: 'white',
      cursor: "pointer",
      right: 40,
      bottom: 30,
      borderRadius: 50,
      width: 50,
      height: 50,
      fontSize: 28
    }
    return (
      <div style = {styles}>
        <Grid>
          <Row>
            <Col sm={6} md={4}> <Bucket cardTitle="My Bucket"/> </Col>
            <Col sm={6} md={4}> <Bucket cardTitle="Brunch Places"/> </Col>
            <Col sm={6} md={4}> <Bucket cardTitle="Outdoor Activities"/> </Col>
          </Row>
        </Grid>
        <div style={addBtn}>+</div>
      </div>
    )
  }
}
