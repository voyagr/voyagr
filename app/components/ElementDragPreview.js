import React, { Component } from 'react';
import TextElement from './ElementComponents/TextElement';
import PhotoElement from './ElementComponents/PhotoElement'
import VideoElement from './ElementComponents/VideoElement'

const styles = {
  display: 'inline-block',
  boxShadow: '10px 10px 5px #888888',
};

export default class ElementDragPreview extends Component {

  constructor (props) {
    super(props)

    this.whatElementToRender = this.whatElementToRender.bind(this)
  }

  whatElementToRender() {
    //switch case based off of the element type,
    //returns the proper element
    const { text, id, source, type, size } = this.props;

    switch (this.props.type) {

      case "textBox":
        return (
          <TextElement text={text} id={id} size={size} type={type} {...this.props}/>
        );
      case "photo":
        return (
          <PhotoElement id={id} size={size} source={source}/>
        );
      case "video":
        return (
          <VideoElement id={id} size={size} source={source}/>
        );
    }
  }


  render() {

    return (
      <div style={styles}>
        {this.whatElementToRender()}
      </div>
    );
  }
}

