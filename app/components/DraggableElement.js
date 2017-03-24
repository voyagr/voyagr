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

class DraggableElement extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    size: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  render() {
    const { text, connectDragSource } = this.props;
    return connectDragSource(
      <div style={getStyles(this.props)}>
        {
          this.props.type === "photo" ?
            <PhotoElement id={this.props.id} source={this.props.source}/>
            : <Element text={text} id={this.props.id} type={this.props.type} />
        }
      </div>,
    );
  }
}

export default DragSource(ItemTypes.ELEMENT, elementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(DraggableElement)
