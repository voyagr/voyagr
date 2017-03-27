import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux'
import TextElement from './TextElement';
import PhotoElement from './PhotoElement'

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
  };
}

class NonDraggableElement extends Component {
  static propTypes = {
    size: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { text, id, size, source, type } = this.props;
    return (
      <div style={getStyles(this.props)}>
        {
          this.props.type === "photo" ?
            <PhotoElement id={id} size={size} source={source} editable={false}/>
            : <TextElement text={text} id={id} size={size} type={type} editable={false} {...this.props}/>
        }
      </div>
    )
  }
}

export default connect(null)(NonDraggableElement)
