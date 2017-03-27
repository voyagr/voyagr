import React, { Component } from 'react';
import TextElement from './TextElement';
import PhotoElement from './PhotoElement'

const styles = {
  display: 'inline-block',
  boxShadow: '10px 10px 5px #888888',
};

export default class ElementDragPreview extends Component {

  render() {
    const { text, id, source, type, size } = this.props;

    return (
      <div style={styles}>
        {
        type === "photo" ?
          <PhotoElement id={id} size={size} source={source} />
        : <TextElement size={size} text={text} />
        }
      </div>
    );
  }
}
