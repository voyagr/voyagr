import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import shouldPureComponentUpdate from './utils/shouldPureComponentUpdate';
import ItemTypes from './utils/ItemTypes';
import TextElement from './ElementComponents/TextElement';
import PhotoElement from './ElementComponents/PhotoElement'
import VideoElement from './ElementComponents/VideoElement'

const elementSource = {
  beginDrag(props) {
    const { size, text, left, top, id, type, source, background, color } = props;
    return { size, text, left, top, id, type, source, background, color };
  },
};

function getStyles(props) {
  const { left, top, isDragging, size } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    size,
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

  constructor (props) {
    super(props)

    this.whatElementToRender = this.whatElementToRender.bind(this)
  }

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

  whatElementToRender() {
    //switch case based off of the element type,
    //returns the proper element
    const { text, connectDragSource, id, size, type, source } = this.props;
    switch (this.props.type) {

      case "textBox":
        return (
          <div style={getStyles(this.props)}>
            <TextElement text={text} id={id} size={size} type={type} {...this.props}/>
          </div>
        );
      case "photo":
        return (
          <div style={getStyles(this.props)}>
            <PhotoElement id={id} size={size} source={source}/>
          </div>
        );
      case "video":
        return (
          <div style={getStyles(this.props)}>
            <VideoElement id={id} size={size} source={source}/>
          </div>
        );
    }
  }

  render() {
    const { text, connectDragSource, id, size, type, source } = this.props;

    return (
      connectDragSource(this.whatElementToRender(),)
    )

    // return connectDragSource(
    //   <div style={getStyles(this.props)}>
    //     {
    //       this.props.type === "photo" ?
    //         <PhotoElement id={id} size={size} source={source}/>
    //         : <TextElement text={text} id={id} size={size} type={type} {...this.props}/>
    //     }
    //   </div>,
    // );
  }
}

export default DragSource(ItemTypes.ELEMENT, elementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(DraggableElement)
