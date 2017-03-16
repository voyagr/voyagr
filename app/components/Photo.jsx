import React, { Component } from 'react';
import { ItemTypes } from '../constants';
import { DragSource } from 'react-dnd';

// specify drag and drop behavior
const photoSource = {
	beginDrag (props, dnd, element) {
		console.log(props, dnd, element, 'photoSource')
		return {}
	}
}

// inject other properties into the component
function collect (connect, monitor) {
	return {
		// what is being dragged
		connectDragPreview: connect.dragPreview(),
		// called on whatever JSX element you want to show while the dragging is happening
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Photo extends Component {
	render() {
		const { connectDragSource, isDragging } = this.props;
		return connectDragSource(
			<div action={this.action}
				className="image"
				style={{
					opacity: isDragging ? 0.5 : 1,
					fontSize: 25,
					fontWeight: 'bold',
					cursor: 'move'
				}}>
				<span>TEST</span>
				<img src="https://www.gracehopper.com/images/gh-logo-sm-w-h_1.svg" />
			</div>
		)
	}
}

export default DragSource(ItemTypes.PHOTO, photoSource, collect)(Photo);
