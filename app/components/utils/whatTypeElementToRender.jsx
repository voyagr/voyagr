import React from 'react'
import TextElement from '../ElementComponents/TextElement';
import PhotoElement from '../ElementComponents/PhotoElement'
import VideoElement from '../ElementComponents/VideoElement'

export default function whatTypeElementToRender (props, editable) {
    //switch case based off of the element type,
    //returns the proper element
    const { text, connectDragSource, id, size, type, source } = props;

    switch (props.type) {

      case "textBox":
        return (
          <TextElement text={text} id={id} size={size} type={type} editable={editable} {...props}/>
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
