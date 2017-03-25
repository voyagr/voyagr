import React, { Component } from 'react';
import Element from './Element';
import PhotoElement from './PhotoElement'

const styles = {
  display: 'inline-block',
  boxShadow: '10px 10px 5px #888888',
};

export default class ElementDragPreview extends Component {

  render() {
    const { text, id, source, type } = this.props;

    return (
      <div style={styles}>
        {
        type === "photo" ?
          <PhotoElement id={id} source={source} />
        : <Element text={text} />
        }
      </div>
    );
  }
}
