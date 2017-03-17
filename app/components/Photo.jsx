import React, { Component } from 'react';
import { ItemTypes } from '../constants';

// // specify drag and drop behavior
// const photoSource = {
// 	beginDrag (props, dnd, element) {
// 		console.log(props, dnd, element, 'photoSource')
// 		return {}
// 	}
// }

// // inject other properties into the component
// function collect (connect, monitor) {
// 	return {
// 		// what is being dragged
// 		connectDragPreview: connect.dragPreview(),
// 		// called on whatever JSX element you want to show while the dragging is happening
// 		connectDragSource: connect.dragSource(),
// 		isDragging: monitor.isDragging()
// 	}
// }

class Photo extends Component {
	constructor (props) {
		super(props);
		this.state = {
			pos: this.props.position,
			dragging: false,
			rel: null, //position relative to the cursor
		} 
	}

	componentDidUpdate (props, state) {
    	if (this.state.dragging && !state.dragging) {
      		document.addEventListener('mousemove', this.onMouseMove)
      		document.addEventListener('mouseup', this.onMouseUp)
    	} else if (!this.state.dragging && state.dragging) {
      		document.removeEventListener('mousemove', this.onMouseMove)
      		document.removeEventListener('mouseup', this.onMouseUp)
    	}
  	}

  // calculate relative position to the mouse and set dragging=true
	onMouseDown (e) {
    // only left mouse button
    	if (e.button !== 0) return
    	var pos = $(this.getDOMNode()).offset()
    	this.setState({
      	dragging: true,
      	rel: {
        	x: e.pageX - pos.left,
        	y: e.pageY - pos.top
      	}
    })
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseUp (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  }

  onMouseMove (e) {
    if (!this.state.dragging) return
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    })
    e.stopPropagation()
    e.preventDefault()
  }
	
	render() {
		return (
			<div onMouseDown={this.onMoueDown}
				className="image"
				style={{
					position: 'absolute',
					left: this.state.pos.x + 'px',
					top: this.state.pos.y + 'px'
				}}>
				<span>TEST</span>
				<img src="https://www.gracehopper.com/images/gh-logo-sm-w-h_1.svg" />
			</div>
		)
	}
}

export default (Photo);
