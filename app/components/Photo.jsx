import React, { Component } from 'react';
import { ItemTypes } from '../constants';
import ReactDOM from 'react-dom'

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
		super(props)
	}

	render() {
		return (
			<div>
				<span>TEST</span>
				<img
					src="https://www.gracehopper.com/images/gh-logo-sm-w-h_1.svg"
					onMouseDown={this.props.onMouseDown}
					onMouseMove={this.props.onMouseMove}
					onMouseUp={this.props.onMouseUp}
					style={this.props.style}
				/>
			</div>
		)
	}
}

export default Photo;
