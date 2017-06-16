import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux'
import whatTypeElementToRender from '../utils/whatTypeElementToRender'

function getStyles(props) {
  const { left, top, isDragging, zIndex } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    zIndex: props.zIndex,
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
    const editable = false

    return (
      <div style={getStyles(this.props, editable)}>
        {whatTypeElementToRender(this.props, editable)}
      </div>
    )
  }
}

export default connect(null)(NonDraggableElement)
