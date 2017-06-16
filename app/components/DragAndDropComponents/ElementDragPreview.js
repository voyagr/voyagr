import React, { Component } from 'react';
import whatTypeElementToRender from '../utils/whatTypeElementToRender'

const styles = {
  display: 'inline-block',
  boxShadow: '10px 10px 5px #888888',
};

export default class ElementDragPreview extends Component {

  render() {

    return (
      <div style={styles}>
        {whatTypeElementToRender(this.props)}
      </div>
    );
  }
}

