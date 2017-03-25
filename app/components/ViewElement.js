import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate';
import ItemTypes from './utils/ItemTypes';
import Element from './Element';
import PhotoElement from './PhotoElement'

const elementSource = {
  beginDrag(props) {
    const { size, text, left, top, id, type, source } = props;
    return { size, text, left, top, id, type, source };
  },
};

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}

class ViewElement extends Component {
  static propTypes = {
    size: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { text, connectDragSource } = this.props;
    return(
      <div style={getStyles(this.props)}>
        {
          this.props.type === "photo" ?
            <PhotoElement id={this.props.id} source={this.props.source}/>
            : <Element text={text} id={this.props.id} type={this.props.type} />
        }
      </div>
    )
  }
}

export default ViewElement
