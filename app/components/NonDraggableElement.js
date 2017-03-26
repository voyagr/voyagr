import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux'
import Element from './Element';
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
    console.log(this.props.type)
    const { text } = this.props;
    return (
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

export default connect(null)(NonDraggableElement)
